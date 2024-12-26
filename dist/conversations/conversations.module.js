"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationsModule = void 0;
const friends_module_1 = require("./../friends/friends.module");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("../users/users.module");
const constants_1 = require("../utils/constants");
const typeorm_2 = require("../utils/typeorm");
const conversations_controller_1 = require("./conversations.controller");
const conversations_service_1 = require("./conversations.service");
const helpers_1 = require("../utils/helpers");
const conversation_middleware_1 = require("./middlewares/conversation.middleware");
let ConversationsModule = class ConversationsModule {
    configure(consumer) {
        consumer
            .apply(helpers_1.isAuthorized, conversation_middleware_1.ConversationMiddleware)
            .forRoutes('conversations/:id');
    }
};
ConversationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([typeorm_2.Conversation, typeorm_2.Message]),
            users_module_1.UsersModule,
            friends_module_1.FriendsModule,
        ],
        controllers: [conversations_controller_1.ConversationsController],
        providers: [
            {
                provide: constants_1.Services.CONVERSATIONS,
                useClass: conversations_service_1.ConversationsService,
            },
        ],
        exports: [
            {
                provide: constants_1.Services.CONVERSATIONS,
                useClass: conversations_service_1.ConversationsService,
            },
        ],
    })
], ConversationsModule);
exports.ConversationsModule = ConversationsModule;
//# sourceMappingURL=conversations.module.js.map