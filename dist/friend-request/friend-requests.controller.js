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
exports.FriendRequestController = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const constants_1 = require("../utils/constants");
const decorators_1 = require("../utils/decorators");
const typeorm_1 = require("../utils/typeorm");
const CreateFriend_dto_1 = require("./dtos/CreateFriend.dto");
const throttler_1 = require("@nestjs/throttler");
let FriendRequestController = class FriendRequestController {
    constructor(friendRequestService, event) {
        this.friendRequestService = friendRequestService;
        this.event = event;
    }
    getFriendRequests(user) {
        return this.friendRequestService.getFriendRequests(user.id);
    }
    async createFriendRequest(user, { username }) {
        const params = { user, username };
        const friendRequest = await this.friendRequestService.create(params);
        this.event.emit('friendrequest.create', friendRequest);
        return friendRequest;
    }
    async acceptFriendRequest({ id: userId }, id) {
        const response = await this.friendRequestService.accept({ id, userId });
        this.event.emit(constants_1.ServerEvents.FRIEND_REQUEST_ACCEPTED, response);
        return response;
    }
    async cancelFriendRequest({ id: userId }, id) {
        const response = await this.friendRequestService.cancel({ id, userId });
        this.event.emit('friendrequest.cancel', response);
        return response;
    }
    async rejectFriendRequest({ id: userId }, id) {
        const response = await this.friendRequestService.reject({ id, userId });
        this.event.emit(constants_1.ServerEvents.FRIEND_REQUEST_REJECTED, response);
        return response;
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.User]),
    __metadata("design:returntype", void 0)
], FriendRequestController.prototype, "getFriendRequests", null);
__decorate([
    (0, throttler_1.Throttle)(3, 10),
    (0, common_1.Post)(),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.User,
        CreateFriend_dto_1.CreateFriendDto]),
    __metadata("design:returntype", Promise)
], FriendRequestController.prototype, "createFriendRequest", null);
__decorate([
    (0, throttler_1.Throttle)(3, 10),
    (0, common_1.Patch)(':id/accept'),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.User, Number]),
    __metadata("design:returntype", Promise)
], FriendRequestController.prototype, "acceptFriendRequest", null);
__decorate([
    (0, throttler_1.Throttle)(3, 10),
    (0, common_1.Delete)(':id/cancel'),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.User, Number]),
    __metadata("design:returntype", Promise)
], FriendRequestController.prototype, "cancelFriendRequest", null);
__decorate([
    (0, throttler_1.Throttle)(3, 10),
    (0, common_1.Patch)(':id/reject'),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.User, Number]),
    __metadata("design:returntype", Promise)
], FriendRequestController.prototype, "rejectFriendRequest", null);
FriendRequestController = __decorate([
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.Controller)(constants_1.Routes.FRIEND_REQUESTS),
    __param(0, (0, common_1.Inject)(constants_1.Services.FRIENDS_REQUESTS_SERVICE)),
    __metadata("design:paramtypes", [Object, event_emitter_1.EventEmitter2])
], FriendRequestController);
exports.FriendRequestController = FriendRequestController;
//# sourceMappingURL=friend-requests.controller.js.map