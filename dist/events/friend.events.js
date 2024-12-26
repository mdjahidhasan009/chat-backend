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
exports.FriendEvents = void 0;
const constants_1 = require("./../utils/constants");
const event_emitter_1 = require("@nestjs/event-emitter");
const gateway_1 = require("./../gateway/gateway");
const common_1 = require("@nestjs/common");
let FriendEvents = class FriendEvents {
    constructor(gateway) {
        this.gateway = gateway;
    }
    handleFriendRemoved({ userId, friend }) {
        const { sender, receiver } = friend;
        const socket = this.gateway.sessions.getUserSocket(receiver.id === userId
            ? sender.id
            : receiver.id);
        socket === null || socket === void 0 ? void 0 : socket.emit('onFriendRemoved', friend);
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)(constants_1.ServerEvents.FRIEND_REMOVED),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FriendEvents.prototype, "handleFriendRemoved", null);
FriendEvents = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [gateway_1.MessagingGateway])
], FriendEvents);
exports.FriendEvents = FriendEvents;
//# sourceMappingURL=friend.events.js.map