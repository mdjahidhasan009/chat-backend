"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const image_storage_module_1 = require("./../image-storage/image-storage.module");
const common_1 = require("@nestjs/common");
const constants_1 = require("../utils/constants");
const user_service_1 = require("./services/user.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("../utils/typeorm");
const user_controller_1 = require("./controllers/user.controller");
const user_profile_service_1 = require("./services/user-profile.service");
const user_profile_controller_1 = require("./controllers/user-profile.controller");
const user_presence_controller_1 = require("./controllers/user-presence.controller");
const user_presence_service_1 = require("./services/user-presence.service");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([typeorm_2.User, typeorm_2.UserPresence, typeorm_2.Profile, typeorm_2.Peer]),
            image_storage_module_1.ImageStorageModule
        ],
        controllers: [
            user_controller_1.UsersController,
            user_profile_controller_1.UserProfilesController,
            user_presence_controller_1.UserPresenceController
        ],
        providers: [
            {
                provide: constants_1.Services.USERS,
                useClass: user_service_1.UserService,
            },
            {
                provide: constants_1.Services.USERS_PROFILES,
                useClass: user_profile_service_1.UserProfileService,
            },
            {
                provide: constants_1.Services.USER_PRESENCE,
                useClass: user_presence_service_1.UserPresenceService,
            },
        ],
        exports: [
            {
                provide: constants_1.Services.USERS,
                useClass: user_service_1.UserService,
            },
            {
                provide: constants_1.Services.USERS_PROFILES,
                useClass: user_profile_service_1.UserProfileService,
            },
            {
                provide: constants_1.Services.USER_PRESENCE,
                useClass: user_presence_service_1.UserPresenceService,
            },
        ],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map