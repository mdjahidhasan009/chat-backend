"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesModule = void 0;
const friends_module_1 = require("../friends/friends.module");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const conversations_module_1 = require("../conversations/conversations.module");
const image_storage_module_1 = require("../image-storage/image-storage.module");
const message_attachments_module_1 = require("../message-attachments/message-attachments.module");
const constants_1 = require("../utils/constants");
const typeorm_2 = require("../utils/typeorm");
const message_controller_1 = require("./message.controller");
const message_service_1 = require("./message.service");
let MessagesModule = class MessagesModule {
};
MessagesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([typeorm_2.Message, typeorm_2.Conversation]),
            image_storage_module_1.ImageStorageModule,
            message_attachments_module_1.MessageAttachmentsModule,
            conversations_module_1.ConversationsModule,
            friends_module_1.FriendsModule,
        ],
        controllers: [message_controller_1.MessageController],
        providers: [
            {
                provide: constants_1.Services.MESSAGES,
                useClass: message_service_1.MessageService,
            },
        ],
    })
], MessagesModule);
exports.MessagesModule = MessagesModule;
//# sourceMappingURL=messages.module.js.map