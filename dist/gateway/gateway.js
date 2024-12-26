"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagingGateway = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const constants_1 = require("../utils/constants");
const typeorm_1 = require("../utils/typeorm");
const CreateCallDto_1 = require("./dto/CreateCallDto");
let MessagingGateway = class MessagingGateway {
    constructor(sessions, conversationService, groupsService, friendsService) {
        this.sessions = sessions;
        this.conversationService = conversationService;
        this.groupsService = groupsService;
        this.friendsService = friendsService;
    }
    handleConnection(socket, ...args) {
        this.sessions.setUserSocket(socket.user.id, socket);
        socket.emit('connected', {});
    }
    handleDisconnect(socket) {
        this.sessions.removeUserSocket(socket.user.id);
    }
    async handleGetOnlineGroupUsers(data, socket) {
        const group = await this.groupsService.findGroupById(parseInt(data.groupId));
        if (!group)
            return;
        const onlineUsers = [];
        const offlineUsers = [];
        group.users.forEach((user) => {
            const socket = this.sessions.getUserSocket(user.id);
            socket ? onlineUsers.push(user) : offlineUsers.push(user);
        });
        socket.emit('onlineGroupUsersReceived', { onlineUsers, offlineUsers });
    }
    handleCreateMessage(data) {
        console.log('Create Message');
    }
    onConversationJoin(data, client) {
        client.join(`conversation-${data.conversationId}`);
        client.to(`conversation-${data.conversationId}`).emit('userJoin');
    }
    onConversationLeave(data, client) {
        client.leave(`conversation-${data.conversationId}`);
        client.to(`conversation-${data.conversationId}`).emit('userLeave');
    }
    onGroupJoin(data, client) {
        client.join(`group-${data.groupId}`);
        client.to(`group-${data.groupId}`).emit('userGroupJoin');
    }
    onGroupLeave(data, client) {
        client.leave(`group-${data.groupId}`);
        client.to(`group-${data.groupId}`).emit('userGroupLeave');
    }
    onTypingStart(data, client) {
        client.to(`conversation-${data.conversationId}`).emit('onTypingStart');
    }
    onTypingStop(data, client) {
        client.to(`conversation-${data.conversationId}`).emit('onTypingStop');
    }
    handleMessageCreateEvent(payload) {
        const { author, conversation: { creator, recipient }, } = payload.message;
        const authorSocket = this.sessions.getUserSocket(author.id);
        const recipientSocket = author.id === creator.id
            ? this.sessions.getUserSocket(recipient.id)
            : this.sessions.getUserSocket(creator.id);
        if (authorSocket)
            authorSocket.emit('onMessage', payload);
        if (recipientSocket)
            recipientSocket.emit('onMessage', payload);
    }
    handleConversationCreateEvent(payload) {
        const recipientSocket = this.sessions.getUserSocket(payload.recipient.id);
        if (recipientSocket)
            recipientSocket.emit('onConversation', payload);
    }
    async handleMessageDelete(payload) {
        const conversation = await this.conversationService.findById(payload.conversationId);
        if (!conversation)
            return;
        const { creator, recipient } = conversation;
        const recipientSocket = creator.id === payload.userId
            ? this.sessions.getUserSocket(recipient.id)
            : this.sessions.getUserSocket(creator.id);
        if (recipientSocket)
            recipientSocket.emit('onMessageDelete', payload);
    }
    async handleMessageUpdate(message) {
        const { author, conversation: { creator, recipient }, } = message;
        const recipientSocket = author.id === creator.id
            ? this.sessions.getUserSocket(recipient.id)
            : this.sessions.getUserSocket(creator.id);
        if (recipientSocket)
            recipientSocket.emit('onMessageUpdate', message);
    }
    async handleGroupMessageCreate(payload) {
        const { id } = payload.group;
        this.server.to(`group-${id}`).emit('onGroupMessage', payload);
    }
    handleGroupCreate(payload) {
        payload.users.forEach((user) => {
            const socket = this.sessions.getUserSocket(user.id);
            socket && socket.emit('onGroupCreate', payload);
        });
    }
    handleGroupMessageUpdate(payload) {
        const room = `group-${payload.group.id}`;
        this.server.to(room).emit('onGroupMessageUpdate', payload);
    }
    handleGroupUserAdd(payload) {
        const recipientSocket = this.sessions.getUserSocket(payload.user.id);
        this.server
            .to(`group-${payload.group.id}`)
            .emit('onGroupReceivedNewUser', payload);
        recipientSocket && recipientSocket.emit('onGroupUserAdd', payload);
    }
    handleGroupUserRemove(payload) {
        const { group, user } = payload;
        const ROOM_NAME = `group-${payload.group.id}`;
        const removedUserSocket = this.sessions.getUserSocket(payload.user.id);
        if (removedUserSocket) {
            removedUserSocket.emit('onGroupRemoved', payload);
            removedUserSocket.leave(ROOM_NAME);
        }
        this.server.to(ROOM_NAME).emit('onGroupRecipientRemoved', payload);
        const onlineUsers = group.users
            .map((user) => this.sessions.getUserSocket(user.id) && user)
            .filter((user) => user);
    }
    handleGroupOwnerUpdate(payload) {
        const ROOM_NAME = `group-${payload.id}`;
        const newOwnerSocket = this.sessions.getUserSocket(payload.owner.id);
        const { rooms } = this.server.sockets.adapter;
        const socketsInRoom = rooms.get(ROOM_NAME);
        this.server.to(ROOM_NAME).emit('onGroupOwnerUpdate', payload);
        if (newOwnerSocket && !socketsInRoom.has(newOwnerSocket.id)) {
            newOwnerSocket.emit('onGroupOwnerUpdate', payload);
        }
    }
    handleGroupUserLeave(payload) {
        const ROOM_NAME = `group-${payload.group.id}`;
        const { rooms } = this.server.sockets.adapter;
        const socketsInRoom = rooms.get(ROOM_NAME);
        const leftUserSocket = this.sessions.getUserSocket(payload.userId);
        if (leftUserSocket && socketsInRoom) {
            if (socketsInRoom.has(leftUserSocket.id)) {
                return this.server
                    .to(ROOM_NAME)
                    .emit('onGroupParticipantLeft', payload);
            }
            else {
                leftUserSocket.emit('onGroupParticipantLeft', payload);
                this.server.to(ROOM_NAME).emit('onGroupParticipantLeft', payload);
                return;
            }
        }
        if (leftUserSocket && !socketsInRoom) {
            return leftUserSocket.emit('onGroupParticipantLeft', payload);
        }
    }
    async handleFriendListRetrieve(data, socket) {
        const { user } = socket;
        if (user) {
            const friends = await this.friendsService.getFriends(user.id);
            const onlineFriends = friends.filter((friend) => this.sessions.getUserSocket(user.id === friend.receiver.id
                ? friend.sender.id
                : friend.receiver.id));
            socket.emit('getOnlineFriends', onlineFriends);
        }
    }
    async handleVideoCall(data, socket) {
        const caller = socket.user;
        const receiverSocket = this.sessions.getUserSocket(data.recipientId);
        if (!receiverSocket)
            socket.emit('onUserUnavailable');
        receiverSocket.emit('onVideoCall', Object.assign(Object.assign({}, data), { caller }));
    }
    async handleVideoCallAccepted(data, socket) {
        const callerSocket = this.sessions.getUserSocket(data.caller.id);
        const conversation = await this.conversationService.isCreated(data.caller.id, socket.user.id);
        if (!conversation)
            return console.log('No conversation found');
        if (callerSocket) {
            const payload = Object.assign(Object.assign({}, data), { conversation, acceptor: socket.user });
            callerSocket.emit('onVideoCallAccept', payload);
            socket.emit('onVideoCallAccept', payload);
        }
    }
    async handleSendingSignal(payload, socket) {
        const callerSocket = this.sessions.getUserSocket(payload.callerId);
        callerSocket.emit('receivingSignalOfCaller', {
            signal: payload.signal,
            callerId: payload.callerId,
        });
    }
    async handleReturningSignal(payload, socket) {
        const receiverSocket = this.sessions.getUserSocket(payload.callerId);
        receiverSocket.emit('receivingSignalOfReceiverToCaller', {
            signal: payload.signal,
            id: socket.user.id,
        });
    }
    async handleVideoCallRejected(data, socket) {
        const receiver = socket.user;
        const callerSocket = this.sessions.getUserSocket(data.caller.id);
        callerSocket &&
            callerSocket.emit(constants_1.WebsocketEvents.VIDEO_CALL_REJECTED, { receiver });
        socket.emit(constants_1.WebsocketEvents.VIDEO_CALL_REJECTED, { receiver });
    }
    async handleVideoCallHangUp({ caller, receiver }, socket) {
        if (socket.user.id === caller.id) {
            const receiverSocket = this.sessions.getUserSocket(receiver.id);
            socket.emit('onVideoCallHangUp');
            return receiverSocket && receiverSocket.emit('onVideoCallHangUp');
        }
        socket.emit('onVideoCallHangUp');
        const callerSocket = this.sessions.getUserSocket(caller.id);
        callerSocket && callerSocket.emit('onVideoCallHangUp');
    }
    async handleVoiceCallInitiate(payload, socket) {
        const caller = socket.user;
        const receiverSocket = this.sessions.getUserSocket(payload.recipientId);
        if (!receiverSocket)
            socket.emit('onUserUnavailable');
        receiverSocket.emit('onVoiceCall', Object.assign(Object.assign({}, payload), { caller }));
    }
    async handleVoiceCallAccepted(payload, socket) {
        const callerSocket = this.sessions.getUserSocket(payload.caller.id);
        const conversation = await this.conversationService.isCreated(payload.caller.id, socket.user.id);
        if (!conversation)
            return console.log('No conversation found');
        if (callerSocket) {
            const callPayload = Object.assign(Object.assign({}, payload), { conversation, acceptor: socket.user });
            callerSocket.emit(constants_1.WebsocketEvents.VOICE_CALL_ACCEPTED, callPayload);
            socket.emit(constants_1.WebsocketEvents.VOICE_CALL_ACCEPTED, callPayload);
        }
    }
    async handleVoiceCallHangUp({ caller, receiver }, socket) {
        if (socket.user.id === caller.id) {
            const receiverSocket = this.sessions.getUserSocket(receiver.id);
            socket.emit(constants_1.WebsocketEvents.VOICE_CALL_HANG_UP);
            return (receiverSocket &&
                receiverSocket.emit(constants_1.WebsocketEvents.VOICE_CALL_HANG_UP));
        }
        socket.emit(constants_1.WebsocketEvents.VOICE_CALL_HANG_UP);
        const callerSocket = this.sessions.getUserSocket(caller.id);
        callerSocket && callerSocket.emit(constants_1.WebsocketEvents.VOICE_CALL_HANG_UP);
    }
    async handleVoiceCallRejected(data, socket) {
        const receiver = socket.user;
        const callerSocket = this.sessions.getUserSocket(data.caller.id);
        callerSocket &&
            callerSocket.emit(constants_1.WebsocketEvents.VOICE_CALL_REJECTED, { receiver });
        socket.emit(constants_1.WebsocketEvents.VOICE_CALL_REJECTED, { receiver });
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MessagingGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('getOnlineGroupUsers'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessagingGateway.prototype, "handleGetOnlineGroupUsers", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('createMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MessagingGateway.prototype, "handleCreateMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('onConversationJoin'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MessagingGateway.prototype, "onConversationJoin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('onConversationLeave'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MessagingGateway.prototype, "onConversationLeave", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('onGroupJoin'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MessagingGateway.prototype, "onGroupJoin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('onGroupLeave'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MessagingGateway.prototype, "onGroupLeave", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('onTypingStart'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MessagingGateway.prototype, "onTypingStart", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('onTypingStop'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MessagingGateway.prototype, "onTypingStop", null);
__decorate([
    (0, event_emitter_1.OnEvent)('message.create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MessagingGateway.prototype, "handleMessageCreateEvent", null);
__decorate([
    (0, event_emitter_1.OnEvent)('conversation.create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.Conversation]),
    __metadata("design:returntype", void 0)
], MessagingGateway.prototype, "handleConversationCreateEvent", null);
__decorate([
    (0, event_emitter_1.OnEvent)('message.delete'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessagingGateway.prototype, "handleMessageDelete", null);
__decorate([
    (0, event_emitter_1.OnEvent)('message.update'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.Message]),
    __metadata("design:returntype", Promise)
], MessagingGateway.prototype, "handleMessageUpdate", null);
__decorate([
    (0, event_emitter_1.OnEvent)('group.message.create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessagingGateway.prototype, "handleGroupMessageCreate", null);
__decorate([
    (0, event_emitter_1.OnEvent)('group.create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.Group]),
    __metadata("design:returntype", void 0)
], MessagingGateway.prototype, "handleGroupCreate", null);
__decorate([
    (0, event_emitter_1.OnEvent)('group.message.update'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.GroupMessage]),
    __metadata("design:returntype", void 0)
], MessagingGateway.prototype, "handleGroupMessageUpdate", null);
__decorate([
    (0, event_emitter_1.OnEvent)('group.user.add'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MessagingGateway.prototype, "handleGroupUserAdd", null);
__decorate([
    (0, event_emitter_1.OnEvent)('group.user.remove'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MessagingGateway.prototype, "handleGroupUserRemove", null);
__decorate([
    (0, event_emitter_1.OnEvent)('group.owner.update'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.Group]),
    __metadata("design:returntype", void 0)
], MessagingGateway.prototype, "handleGroupOwnerUpdate", null);
__decorate([
    (0, event_emitter_1.OnEvent)('group.user.leave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MessagingGateway.prototype, "handleGroupUserLeave", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getOnlineFriends'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessagingGateway.prototype, "handleFriendListRetrieve", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('onVideoCallInitiate'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateCallDto_1.CreateCallDto, Object]),
    __metadata("design:returntype", Promise)
], MessagingGateway.prototype, "handleVideoCall", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('videoCallAccepted'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessagingGateway.prototype, "handleVideoCallAccepted", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendingSignalOfCallerToReceiver'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessagingGateway.prototype, "handleSendingSignal", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('returningSignalOfReceiverToCaller'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessagingGateway.prototype, "handleReturningSignal", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(constants_1.WebsocketEvents.VIDEO_CALL_REJECTED),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessagingGateway.prototype, "handleVideoCallRejected", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('videoCallHangUp'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessagingGateway.prototype, "handleVideoCallHangUp", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('onVoiceCallInitiate'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessagingGateway.prototype, "handleVoiceCallInitiate", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(constants_1.WebsocketEvents.VOICE_CALL_ACCEPTED),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessagingGateway.prototype, "handleVoiceCallAccepted", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(constants_1.WebsocketEvents.VOICE_CALL_HANG_UP),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessagingGateway.prototype, "handleVoiceCallHangUp", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(constants_1.WebsocketEvents.VOICE_CALL_REJECTED),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessagingGateway.prototype, "handleVoiceCallRejected", null);
MessagingGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: [
                'http://localhost:3000',
                `${process.env.FRONTEND_URL}`,
            ],
            credentials: true,
        },
        pingInterval: 10000,
        pingTimeout: 15000,
    }),
    __param(0, (0, common_1.Inject)(constants_1.Services.GATEWAY_SESSION_MANAGER)),
    __param(1, (0, common_1.Inject)(constants_1.Services.CONVERSATIONS)),
    __param(2, (0, common_1.Inject)(constants_1.Services.GROUPS)),
    __param(3, (0, common_1.Inject)(constants_1.Services.FRIENDS_SERVICE)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], MessagingGateway);
exports.MessagingGateway = MessagingGateway;
//# sourceMappingURL=gateway.js.map