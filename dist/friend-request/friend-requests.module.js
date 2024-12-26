"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendRequestsModule = void 0;
const friends_module_1 = require("./../friends/friends.module");
const FriendRequest_1 = require("./../utils/typeorm/entities/FriendRequest");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Friend_1 = require("../utils/typeorm/entities/Friend");
const users_module_1 = require("../users/users.module");
const friend_requests_controller_1 = require("./friend-requests.controller");
const constants_1 = require("../utils/constants");
const friend_requests_service_1 = require("./friend-requests.service");
let FriendRequestsModule = class FriendRequestsModule {
};
FriendRequestsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([Friend_1.Friend, FriendRequest_1.FriendRequest]),
            users_module_1.UsersModule,
            friends_module_1.FriendsModule
        ],
        controllers: [friend_requests_controller_1.FriendRequestController],
        providers: [
            {
                provide: constants_1.Services.FRIENDS_REQUESTS_SERVICE,
                useClass: friend_requests_service_1.FriendRequestService,
            },
        ],
    })
], FriendRequestsModule);
exports.FriendRequestsModule = FriendRequestsModule;
//# sourceMappingURL=friend-requests.module.js.map