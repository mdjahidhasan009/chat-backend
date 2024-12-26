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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendRequestsEvents = void 0;
const constants_1 = require("./../utils/constants");
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const gateway_1 = require("../gateway/gateway");
const typeorm_1 = require("../utils/typeorm");
let FriendRequestsEvents = class FriendRequestsEvents {
    constructor(gateway) {
        this.gateway = gateway;
    }
    friendRequestCreate(payload) {
        const receiverSocket = this.gateway.sessions.getUserSocket(payload.receiver.id);
        receiverSocket && receiverSocket.emit('onFriendRequestReceived', payload);
    }
    handleFriendRequestCancel(payload) {
        const receiverSocket = this.gateway.sessions.getUserSocket(payload.receiver.id);
        receiverSocket && receiverSocket.emit('onFriendRequestCancelled', payload);
    }
    handleFriendRequestAccepted(payload) {
        const senderSocket = this.gateway.sessions.getUserSocket(payload.friendRequest.sender.id);
        senderSocket && senderSocket.emit(constants_1.WebsocketEvents.FRIEND_REQUEST_ACCEPTED, payload);
    }
    handleFriendRequestRejected(payload) {
        const senderSocket = this.gateway.sessions.getUserSocket(payload.sender.id);
        senderSocket && senderSocket.emit(constants_1.WebsocketEvents.FRIEND_REQUEST_REJECTED, payload);
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('friendrequest.create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.FriendRequest]),
    __metadata("design:returntype", void 0)
], FriendRequestsEvents.prototype, "friendRequestCreate", null);
__decorate([
    (0, event_emitter_1.OnEvent)('friendrequest.cancel'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.FriendRequest]),
    __metadata("design:returntype", void 0)
], FriendRequestsEvents.prototype, "handleFriendRequestCancel", null);
__decorate([
    (0, event_emitter_1.OnEvent)(constants_1.ServerEvents.FRIEND_REQUEST_ACCEPTED),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FriendRequestsEvents.prototype, "handleFriendRequestAccepted", null);
__decorate([
    (0, event_emitter_1.OnEvent)(constants_1.ServerEvents.FRIEND_REQUEST_REJECTED),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.FriendRequest]),
    __metadata("design:returntype", void 0)
], FriendRequestsEvents.prototype, "handleFriendRequestRejected", null);
FriendRequestsEvents = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [gateway_1.MessagingGateway])
], FriendRequestsEvents);
exports.FriendRequestsEvents = FriendRequestsEvents;
//# sourceMappingURL=friend-requests.events.js.map