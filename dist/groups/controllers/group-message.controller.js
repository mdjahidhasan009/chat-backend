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
exports.GroupMessageController = void 0;
const EmptyMessage_1 = require("./../../messages/exceptions/EmptyMessage");
const common_1 = require("@nestjs/common");
const constants_1 = require("../../utils/constants");
const decorators_1 = require("../../utils/decorators");
const typeorm_1 = require("../../utils/typeorm");
const CreateMessage_dto_1 = require("../../messages/dtos/CreateMessage.dto");
const event_emitter_1 = require("@nestjs/event-emitter");
const EditMessage_dto_1 = require("../../messages/dtos/EditMessage.dto");
const throttler_1 = require("@nestjs/throttler");
const platform_express_1 = require("@nestjs/platform-express");
let GroupMessageController = class GroupMessageController {
    constructor(groupMessageService, eventEmitter) {
        this.groupMessageService = groupMessageService;
        this.eventEmitter = eventEmitter;
    }
    async createGroupMessage(user, { attachments }, id, { content }) {
        if (!attachments && !content)
            throw new EmptyMessage_1.EmptyMessageException();
        const params = { groupId: id, author: user, content, attachments };
        const response = await this.groupMessageService.createGroupMessage(params);
        this.eventEmitter.emit('group.message.create', response);
        return;
    }
    async getGroupMessages(user, id) {
        const messages = await this.groupMessageService.getGroupMessages(id);
        return { id, messages };
    }
    async deleteGroupMessage(user, groupId, messageId) {
        await this.groupMessageService.deleteGroupMessage({
            userId: user.id,
            groupId,
            messageId,
        });
        this.eventEmitter.emit('group.message.delete', {
            userId: user.id,
            messageId,
            groupId,
        });
        return { groupId, messageId };
    }
    async editGroupMessage({ id: userId }, groupId, messageId, { content }) {
        const params = { userId, content, groupId, messageId };
        const message = await this.groupMessageService.editGroupMessage(params);
        this.eventEmitter.emit('group.message.update', message);
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
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.User, Object, Number, CreateMessage_dto_1.CreateMessageDto]),
    __metadata("design:returntype", Promise)
], GroupMessageController.prototype, "createGroupMessage", null);
__decorate([
    (0, common_1.Get)(),
    (0, throttler_1.SkipThrottle)(),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.User, Number]),
    __metadata("design:returntype", Promise)
], GroupMessageController.prototype, "getGroupMessages", null);
__decorate([
    (0, common_1.Delete)(':messageId'),
    (0, throttler_1.SkipThrottle)(),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('messageId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.User, Number, Number]),
    __metadata("design:returntype", Promise)
], GroupMessageController.prototype, "deleteGroupMessage", null);
__decorate([
    (0, common_1.Patch)(':messageId'),
    (0, throttler_1.SkipThrottle)(),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('messageId', common_1.ParseIntPipe)),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.User, Number, Number, EditMessage_dto_1.EditMessageDto]),
    __metadata("design:returntype", Promise)
], GroupMessageController.prototype, "editGroupMessage", null);
GroupMessageController = __decorate([
    (0, common_1.Controller)(constants_1.Routes.GROUP_MESSAGES),
    __param(0, (0, common_1.Inject)(constants_1.Services.GROUP_MESSAGES)),
    __metadata("design:paramtypes", [Object, event_emitter_1.EventEmitter2])
], GroupMessageController);
exports.GroupMessageController = GroupMessageController;
//# sourceMappingURL=group-message.controller.js.map