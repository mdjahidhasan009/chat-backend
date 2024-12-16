import { Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  ConnectedSocket,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { IConversationsService } from '../conversations/conversations';
import { IFriendsService } from '../friends/friends';
import { IGroupService } from '../groups/interfaces/group';
import { Services, WebsocketEvents } from '../utils/constants';
import { AuthenticatedSocket } from '../utils/interfaces';
import { Conversation, Group, GroupMessage, Message } from '../utils/typeorm';
import {
  AddGroupUserResponse,
  CallAcceptedPayload,
  CreateGroupMessageResponse,
  CreateMessageResponse,
  RemoveGroupUserResponse,
  CallHangUpPayload,
  VoiceCallPayload,
} from '../utils/types';
import { IGatewaySessionManager } from './gateway.session';
import { CreateCallDto } from './dto/CreateCallDto';

@WebSocketGateway({
  cors: {
    origin: [
      'http://localhost:3000', // Local development
      `${process.env.FRONTEND_URL}`, // Deployed frontend
    ],
    credentials: true,
  },
  pingInterval: 10000,
  pingTimeout: 15000,
})
export class MessagingGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @Inject(Services.GATEWAY_SESSION_MANAGER)
    readonly sessions: IGatewaySessionManager,
    @Inject(Services.CONVERSATIONS)
    private readonly conversationService: IConversationsService,
    @Inject(Services.GROUPS)
    private readonly groupsService: IGroupService,
    @Inject(Services.FRIENDS_SERVICE)
    private readonly friendsService: IFriendsService,
  ) {}

  @WebSocketServer()
  server: Server;

  handleConnection(socket: AuthenticatedSocket, ...args: any[]) {
    this.sessions.setUserSocket(socket.user.id, socket);
    socket.emit('connected', {});
  }

  handleDisconnect(socket: AuthenticatedSocket) {
    this.sessions.removeUserSocket(socket.user.id);
  }

  @SubscribeMessage('getOnlineGroupUsers')
  async handleGetOnlineGroupUsers(
    @MessageBody() data: any,
    @ConnectedSocket() socket: AuthenticatedSocket,
  ) {
    const group = await this.groupsService.findGroupById(
      parseInt(data.groupId),
    );
    if (!group) return;
    const onlineUsers = [];
    const offlineUsers = [];
    group.users.forEach((user) => {
      const socket = this.sessions.getUserSocket(user.id);
      socket ? onlineUsers.push(user) : offlineUsers.push(user);
    });
    socket.emit('onlineGroupUsersReceived', { onlineUsers, offlineUsers });
  }

  @SubscribeMessage('createMessage')
  handleCreateMessage(@MessageBody() data: any) {
    console.log('Create Message');
  }

  @SubscribeMessage('onConversationJoin')
  onConversationJoin(
    @MessageBody() data: any,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    client.join(`conversation-${data.conversationId}`);
    client.to(`conversation-${data.conversationId}`).emit('userJoin');
  }

  @SubscribeMessage('onConversationLeave')
  onConversationLeave(
    @MessageBody() data: any,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    client.leave(`conversation-${data.conversationId}`);
    client.to(`conversation-${data.conversationId}`).emit('userLeave');
  }

  @SubscribeMessage('onGroupJoin')
  onGroupJoin(
    @MessageBody() data: any,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    client.join(`group-${data.groupId}`);
    client.to(`group-${data.groupId}`).emit('userGroupJoin');
  }

  @SubscribeMessage('onGroupLeave')
  onGroupLeave(
    @MessageBody() data: any,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    client.leave(`group-${data.groupId}`);
    client.to(`group-${data.groupId}`).emit('userGroupLeave');
  }

  @SubscribeMessage('onTypingStart')
  onTypingStart(
    @MessageBody() data: any,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    client.to(`conversation-${data.conversationId}`).emit('onTypingStart');
  }

  @SubscribeMessage('onTypingStop')
  onTypingStop(
    @MessageBody() data: any,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    client.to(`conversation-${data.conversationId}`).emit('onTypingStop');
  }

  @OnEvent('message.create')
  handleMessageCreateEvent(payload: CreateMessageResponse) {
    const {
      author,
      conversation: { creator, recipient },
    } = payload.message;

    const authorSocket = this.sessions.getUserSocket(author.id);
    const recipientSocket =
      author.id === creator.id
        ? this.sessions.getUserSocket(recipient.id)
        : this.sessions.getUserSocket(creator.id);

    if (authorSocket) authorSocket.emit('onMessage', payload);
    if (recipientSocket) recipientSocket.emit('onMessage', payload);
  }

  @OnEvent('conversation.create')
  handleConversationCreateEvent(payload: Conversation) {
    const recipientSocket = this.sessions.getUserSocket(payload.recipient.id);
    if (recipientSocket) recipientSocket.emit('onConversation', payload);
  }

  @OnEvent('message.delete')
  async handleMessageDelete(payload) {
    const conversation = await this.conversationService.findById(
      payload.conversationId,
    );
    if (!conversation) return;
    const { creator, recipient } = conversation;
    const recipientSocket =
      creator.id === payload.userId
        ? this.sessions.getUserSocket(recipient.id)
        : this.sessions.getUserSocket(creator.id);
    if (recipientSocket) recipientSocket.emit('onMessageDelete', payload);
  }

  @OnEvent('message.update')
  async handleMessageUpdate(message: Message) {
    const {
      author,
      conversation: { creator, recipient },
    } = message;
    const recipientSocket =
      author.id === creator.id
        ? this.sessions.getUserSocket(recipient.id)
        : this.sessions.getUserSocket(creator.id);
    if (recipientSocket) recipientSocket.emit('onMessageUpdate', message);
  }

  @OnEvent('group.message.create')
  async handleGroupMessageCreate(payload: CreateGroupMessageResponse) {
    const { id } = payload.group;
    this.server.to(`group-${id}`).emit('onGroupMessage', payload);
  }

  @OnEvent('group.create')
  handleGroupCreate(payload: Group) {
    payload.users.forEach((user) => {
      const socket = this.sessions.getUserSocket(user.id);
      socket && socket.emit('onGroupCreate', payload);
    });
  }

  @OnEvent('group.message.update')
  handleGroupMessageUpdate(payload: GroupMessage) {
    const room = `group-${payload.group.id}`;
    this.server.to(room).emit('onGroupMessageUpdate', payload);
  }

  @OnEvent('group.user.add')
  handleGroupUserAdd(payload: AddGroupUserResponse) {
    const recipientSocket = this.sessions.getUserSocket(payload.user.id);
    this.server
      .to(`group-${payload.group.id}`)
      .emit('onGroupReceivedNewUser', payload);
    recipientSocket && recipientSocket.emit('onGroupUserAdd', payload);
  }

  @OnEvent('group.user.remove')
  handleGroupUserRemove(payload: RemoveGroupUserResponse) {
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
    // this.server.to(ROOM_NAME).emit('onlineGroupUsersReceived', { onlineUsers });
  }

  @OnEvent('group.owner.update')
  handleGroupOwnerUpdate(payload: Group) {
    const ROOM_NAME = `group-${payload.id}`;
    const newOwnerSocket = this.sessions.getUserSocket(payload.owner.id);
    const { rooms } = this.server.sockets.adapter;
    const socketsInRoom = rooms.get(ROOM_NAME);
    // Check if the new owner is in the group (room)
    this.server.to(ROOM_NAME).emit('onGroupOwnerUpdate', payload);
    if (newOwnerSocket && !socketsInRoom.has(newOwnerSocket.id)) {
      newOwnerSocket.emit('onGroupOwnerUpdate', payload);
    }
  }

  @OnEvent('group.user.leave')
  handleGroupUserLeave(payload) {
    const ROOM_NAME = `group-${payload.group.id}`;
    const { rooms } = this.server.sockets.adapter;
    const socketsInRoom = rooms.get(ROOM_NAME);
    const leftUserSocket = this.sessions.getUserSocket(payload.userId);
    /**
     * If socketsInRoom is undefined, this means that there is
     * no one connected to the room. So just emit the event for
     * the connected user if they are online.
     */
    if (leftUserSocket && socketsInRoom) {
      if (socketsInRoom.has(leftUserSocket.id)) {
        return this.server
          .to(ROOM_NAME)
          .emit('onGroupParticipantLeft', payload);
      } else {
        leftUserSocket.emit('onGroupParticipantLeft', payload);
        this.server.to(ROOM_NAME).emit('onGroupParticipantLeft', payload);
        return;
      }
    }
    if (leftUserSocket && !socketsInRoom) {
      return leftUserSocket.emit('onGroupParticipantLeft', payload);
    }
  }

  @SubscribeMessage('getOnlineFriends')
  async handleFriendListRetrieve(
    @MessageBody() data: any,
    @ConnectedSocket() socket: AuthenticatedSocket,
  ) {
    const { user } = socket;
    if (user) {
      const friends = await this.friendsService.getFriends(user.id);
      const onlineFriends = friends.filter((friend) =>
        this.sessions.getUserSocket(
          user.id === friend.receiver.id
            ? friend.sender.id
            : friend.receiver.id,
        ),
      );
      socket.emit('getOnlineFriends', onlineFriends);
    }
  }

  // Step 3: Handle the video call initiation event from the frontend fired after on click video icon
  @SubscribeMessage('onVideoCallInitiate')
  async handleVideoCall(
    @MessageBody() data: CreateCallDto,
    @ConnectedSocket() socket: AuthenticatedSocket,
  ) {
    const caller = socket.user;
    const receiverSocket = this.sessions.getUserSocket(data.recipientId);
    if (!receiverSocket) socket.emit('onUserUnavailable');
    // Step 4: Emit an event to the recipient to initiate the video call
    receiverSocket.emit('onVideoCall', { ...data, caller });
  }

  // Step 7: User click on the accept button to accept the video call and emit this event to the server to notify the
  // caller that the receiver has accepted the call
  @SubscribeMessage('videoCallAccepted')
  async handleVideoCallAccepted(
    @MessageBody() data: CallAcceptedPayload,
    @ConnectedSocket() socket: AuthenticatedSocket,
  ) {
    const callerSocket = this.sessions.getUserSocket(data.caller.id);
    const conversation = await this.conversationService.isCreated(
      data.caller.id,
      socket.user.id,
    );
    if (!conversation) return console.log('No conversation found');
    if (callerSocket) {
      const payload = { ...data, conversation, acceptor: socket.user };

      // Step 8: Emit the video call accept event to the frontend to notify the caller that the receiver has accepted
      // the call from backend
      callerSocket.emit('onVideoCallAccept', payload);
      socket.emit('onVideoCallAccept', payload);
      ////TODO: will remove after test
      // console.log(callerSocket);
      // socket.emit('call', callerSocket);
    }
  }

  //receive sendingSignalOfCallerToReceiver from the receiver and send it to the caller
  //sendingSignal
  @SubscribeMessage('sendingSignalOfCallerToReceiver')
  async handleSendingSignal(
    @MessageBody() payload: any,
    @ConnectedSocket() socket: AuthenticatedSocket,
  ) {
    console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
    console.log('sendingSignalOfCallerToReceiver => will send own single to other user')
    const callerSocket = this.sessions.getUserSocket(payload.callerId);
    // console.log(payload)
    // callerSocket.emit('newuserJoined', { signal: payload.signal, callerId: payload.callerId });
    //userJoined

    // console.log(callerSocket)
    // console.log(callerSocket)

    callerSocket.emit('receivingSignalOfCaller', {
      signal: payload.signal,
      callerId: payload.callerId,
    });
  }

  //receive returningSignalOfReceiverToCaller from the caller and send it to the receiver
  //returningSignal
  @SubscribeMessage('returningSignalOfReceiverToCaller')
  async handleReturningSignal(
    @MessageBody() payload: any,
    @ConnectedSocket() socket: AuthenticatedSocket,
  ) {
    const receiverSocket = this.sessions.getUserSocket(payload.callerId);
    // takingReturnedSignal
    receiverSocket.emit('receivingSignalOfReceiverToCaller', {
      signal: payload.signal,
      id: socket.user.id,
    });
  }

  @SubscribeMessage(WebsocketEvents.VIDEO_CALL_REJECTED)
  async handleVideoCallRejected(
    @MessageBody() data,
    @ConnectedSocket() socket: AuthenticatedSocket,
  ) {
    const receiver = socket.user;
    const callerSocket = this.sessions.getUserSocket(data.caller.id);
    callerSocket &&
      callerSocket.emit(WebsocketEvents.VIDEO_CALL_REJECTED, { receiver });
    socket.emit(WebsocketEvents.VIDEO_CALL_REJECTED, { receiver });
  }

  @SubscribeMessage('videoCallHangUp')
  async handleVideoCallHangUp(
    @MessageBody() { caller, receiver }: CallHangUpPayload,
    @ConnectedSocket() socket: AuthenticatedSocket,
  ) {
    if (socket.user.id === caller.id) {
      const receiverSocket = this.sessions.getUserSocket(receiver.id);
      socket.emit('onVideoCallHangUp');
      return receiverSocket && receiverSocket.emit('onVideoCallHangUp');
    }
    socket.emit('onVideoCallHangUp');
    const callerSocket = this.sessions.getUserSocket(caller.id);
    callerSocket && callerSocket.emit('onVideoCallHangUp');
  }

  @SubscribeMessage('onVoiceCallInitiate')
  async handleVoiceCallInitiate(
    @MessageBody() payload: VoiceCallPayload,
    @ConnectedSocket() socket: AuthenticatedSocket,
  ) {
    const caller = socket.user;
    const receiverSocket = this.sessions.getUserSocket(payload.recipientId);
    if (!receiverSocket) socket.emit('onUserUnavailable');
    receiverSocket.emit('onVoiceCall', { ...payload, caller });
  }

  @SubscribeMessage(WebsocketEvents.VOICE_CALL_ACCEPTED)
  async handleVoiceCallAccepted(
    @MessageBody() payload: CallAcceptedPayload,
    @ConnectedSocket() socket: AuthenticatedSocket,
  ) {
    const callerSocket = this.sessions.getUserSocket(payload.caller.id);
    const conversation = await this.conversationService.isCreated(
      payload.caller.id,
      socket.user.id,
    );
    if (!conversation) return console.log('No conversation found');
    if (callerSocket) {
      const callPayload = { ...payload, conversation, acceptor: socket.user };
      callerSocket.emit(WebsocketEvents.VOICE_CALL_ACCEPTED, callPayload);
      socket.emit(WebsocketEvents.VOICE_CALL_ACCEPTED, callPayload);
    }
  }

  @SubscribeMessage(WebsocketEvents.VOICE_CALL_HANG_UP)
  async handleVoiceCallHangUp(
    @MessageBody() { caller, receiver }: CallHangUpPayload,
    @ConnectedSocket() socket: AuthenticatedSocket,
  ) {
    if (socket.user.id === caller.id) {
      const receiverSocket = this.sessions.getUserSocket(receiver.id);
      socket.emit(WebsocketEvents.VOICE_CALL_HANG_UP);
      return (
        receiverSocket &&
        receiverSocket.emit(WebsocketEvents.VOICE_CALL_HANG_UP)
      );
    }
    socket.emit(WebsocketEvents.VOICE_CALL_HANG_UP);
    const callerSocket = this.sessions.getUserSocket(caller.id);
    callerSocket && callerSocket.emit(WebsocketEvents.VOICE_CALL_HANG_UP);
  }

  @SubscribeMessage(WebsocketEvents.VOICE_CALL_REJECTED)
  async handleVoiceCallRejected(
    @MessageBody() data,
    @ConnectedSocket() socket: AuthenticatedSocket,
  ) {
    const receiver = socket.user;
    const callerSocket = this.sessions.getUserSocket(data.caller.id);
    callerSocket &&
      callerSocket.emit(WebsocketEvents.VOICE_CALL_REJECTED, { receiver });
    socket.emit(WebsocketEvents.VOICE_CALL_REJECTED, { receiver });
  }
}