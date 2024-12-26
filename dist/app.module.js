"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const conversations_module_1 = require("./conversations/conversations.module");
const messages_module_1 = require("./messages/messages.module");
const gateway_module_1 = require("./gateway/gateway.module");
const typeorm_2 = __importDefault(require("./utils/typeorm"));
const event_emitter_1 = require("@nestjs/event-emitter");
const group_module_1 = require("./groups/group.module");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const friend_requests_module_1 = require("./friend-request/friend-requests.module");
const events_module_1 = require("./events/events.module");
const exists_module_1 = require("./exists/exists.module");
const message_attachments_module_1 = require("./message-attachments/message-attachments.module");
const throttler_2 = require("./utils/throttler");
const friends_module_1 = require("./friends/friends.module");
let envFilePath = '.env.development';
if (process.env.ENVIRONMENT === 'PRODUCTION')
    envFilePath = '.env.production';
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            conversations_module_1.ConversationsModule,
            config_1.ConfigModule.forRoot({ envFilePath }),
            passport_1.PassportModule.register({ session: true }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.MYSQL_DB_HOST,
                port: parseInt(process.env.MYSQL_DB_PORT),
                username: process.env.MYSQL_DB_USERNAME,
                password: process.env.MYSQL_DB_PASSWORD,
                database: process.env.MYSQL_DB_NAME,
                synchronize: true,
                entities: typeorm_2.default,
                logging: false,
            }),
            messages_module_1.MessagesModule,
            gateway_module_1.GatewayModule,
            group_module_1.GroupModule,
            events_module_1.EventsModule,
            friend_requests_module_1.FriendRequestsModule,
            friends_module_1.FriendsModule,
            exists_module_1.ExistsModule,
            message_attachments_module_1.MessageAttachmentsModule,
            event_emitter_1.EventEmitterModule.forRoot(),
            throttler_1.ThrottlerModule.forRoot({
                ttl: 10,
                limit: 10,
            }),
        ],
        controllers: [],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_2.ThrottlerBehindProxyGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map