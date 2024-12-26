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
exports.MessageController = void 0;
const platform_express_1 = require("@nestjs/platform-express");
const common_1 = require("@nestjs/common");
const constants_1 = require("../utils/constants");
const CreateMessage_dto_1 = require("./dtos/CreateMessage.dto");
const decorators_1 = require("../utils/decorators");
const typeorm_1 = require("../utils/typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const EditMessage_dto_1 = require("./dtos/EditMessage.dto");
const throttler_1 = require("@nestjs/throttler");
const EmptyMessage_1 = require("./exceptions/EmptyMessage");
let MessageController = class MessageController {
    constructor(messageService, eventEmitter) {
        this.messageService = messageService;
        this.eventEmitter = eventEmitter;
    }
    async createMessage(user, id, { content }, { attachments }) {
        if (!attachments && !content)
            throw new EmptyMessage_1.EmptyMessageException();
        const params = { user, id, content, attachments };
        const response = await this.messageService.createMessage(params);
        this.eventEmitter.emit('message.create', response);
        return;
    }
    async getMessagesFromConversation(user, id) {
        const messages = await this.messageService.getMessages(id);
        return { id, messages };
    }
    async deleteMessageFromConversation(user, conversationId, messageId) {
        const params = { userId: user.id, conversationId, messageId };
        await this.messageService.deleteMessage(params);
        this.eventEmitter.emit('message.delete', params);
        return { conversationId, messageId };
    }
    async editMessage({ id: userId }, conversationId, messageId, { content }) {
        const params = { userId, content, conversationId, messageId };
        const message = await this.messageService.editMessage(params);
        this.eventEmitter.emit('message.update', message);
        return message;
    }
};
__decorate([
    (0, throttler_1.Throttle)(5, 10),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        {
            name: 'attachments',
            maxCount: 5,
        },
    ])),
    (0, common_1.Post)(),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.User, Number, CreateMessage_dto_1.CreateMessageDto, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "createMessage", null);
__decorate([
    (0, common_1.Get)(),
    (0, throttler_1.SkipThrottle)(),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.User, Number]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getMessagesFromConversation", null);
__decorate([
    (0, common_1.Delete)(':messageId'),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('messageId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.User, Number, Number]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "deleteMessageFromConversation", null);
__decorate([
    (0, common_1.Patch)(':messageId'),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('messageId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.User, Number, Number, EditMessage_dto_1.EditMessageDto]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "editMessage", null);
MessageController = __decorate([
    (0, common_1.Controller)(constants_1.Routes.MESSAGES),
    __param(0, (0, common_1.Inject)(constants_1.Services.MESSAGES)),
    __metadata("design:paramtypes", [Object, event_emitter_1.EventEmitter2])
], MessageController);
exports.MessageController = MessageController;
//# sourceMappingURL=message.controller.js.map