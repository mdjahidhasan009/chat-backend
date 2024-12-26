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
exports.FriendsController = void 0;
const constants_1 = require("./../utils/constants");
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const common_3 = require("@nestjs/common");
const decorators_1 = require("../utils/decorators");
const constants_2 = require("../utils/constants");
const typeorm_1 = require("../utils/typeorm");
const throttler_1 = require("@nestjs/throttler");
const event_emitter_1 = require("@nestjs/event-emitter");
let FriendsController = class FriendsController {
    constructor(friendsService, event) {
        this.friendsService = friendsService;
        this.event = event;
    }
    getFriends(user) {
        return this.friendsService.getFriends(user.id);
    }
    async deleteFriend({ id: userId }, id) {
        const friend = await this.friendsService.deleteFriend({ id, userId });
        this.event.emit(constants_1.ServerEvents.FRIEND_REMOVED, { friend, userId });
        return friend;
    }
};
__decorate([
    (0, common_3.Get)(),
    __param(0, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.User]),
    __metadata("design:returntype", void 0)
], FriendsController.prototype, "getFriends", null);
__decorate([
    (0, common_2.Delete)(':id/delete'),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_2.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.User, Number]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "deleteFriend", null);
FriendsController = __decorate([
    (0, throttler_1.SkipThrottle)(),
    (0, common_3.Controller)(constants_2.Routes.FRIENDS),
    __param(0, (0, common_3.Inject)(constants_2.Services.FRIENDS_SERVICE)),
    __metadata("design:paramtypes", [Object, event_emitter_1.EventEmitter2])
], FriendsController);
exports.FriendsController = FriendsController;
//# sourceMappingURL=friends.controller.js.map