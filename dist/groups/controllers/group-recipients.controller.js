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
exports.GroupRecipientsController = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../utils/constants");
const decorators_1 = require("../../utils/decorators");
const typeorm_1 = require("../../utils/typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const throttler_1 = require("@nestjs/throttler");
const AddGroupRecipient_dto_1 = require("../dtos/AddGroupRecipient.dto");
let GroupRecipientsController = class GroupRecipientsController {
    constructor(groupRecipientService, eventEmitter) {
        this.groupRecipientService = groupRecipientService;
        this.eventEmitter = eventEmitter;
    }
    async addGroupRecipient({ id: userId }, id, { username }) {
        const params = { id, userId, username };
        const response = await this.groupRecipientService.addGroupRecipient(params);
        this.eventEmitter.emit('group.user.add', response);
        return response;
    }
    async leaveGroup(user, groupId) {
        const group = await this.groupRecipientService.leaveGroup({
            id: groupId,
            userId: user.id,
        });
        this.eventEmitter.emit('group.user.leave', { group, userId: user.id });
        return group;
    }
    async removeGroupRecipient({ id: issuerId }, id, removeUserId) {
        const params = { issuerId, id, removeUserId };
        const response = await this.groupRecipientService.removeGroupRecipient(params);
        this.eventEmitter.emit('group.user.remove', response);
        return response.group;
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.User, Number, AddGroupRecipient_dto_1.AddGroupRecipientDto]),
    __metadata("design:returntype", Promise)
], GroupRecipientsController.prototype, "addGroupRecipient", null);
__decorate([
    (0, common_1.Delete)('leave'),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.User, Number]),
    __metadata("design:returntype", Promise)
], GroupRecipientsController.prototype, "leaveGroup", null);
__decorate([
    (0, common_1.Delete)(':userId'),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.User, Number, Number]),
    __metadata("design:returntype", Promise)
], GroupRecipientsController.prototype, "removeGroupRecipient", null);
GroupRecipientsController = __decorate([
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.Controller)(constants_1.Routes.GROUP_RECIPIENTS),
    __param(0, (0, common_1.Inject)(constants_1.Services.GROUP_RECIPIENTS)),
    __metadata("design:paramtypes", [Object, event_emitter_1.EventEmitter2])
], GroupRecipientsController);
exports.GroupRecipientsController = GroupRecipientsController;
//# sourceMappingURL=group-recipients.controller.js.map