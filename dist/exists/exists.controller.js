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
exports.ExistsController = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const constants_1 = require("../utils/constants");
const decorators_1 = require("../utils/decorators");
const typeorm_1 = require("../utils/typeorm");
let ExistsController = class ExistsController {
    constructor(conversationsService, userService, events) {
        this.conversationsService = conversationsService;
        this.userService = userService;
        this.events = events;
    }
    async checkConversationExists(user, recipientId) {
        const conversation = await this.conversationsService.isCreated(recipientId, user.id);
        if (conversation)
            return conversation;
        const recipient = await this.userService.findUser({ id: recipientId });
        if (!recipient)
            throw new common_1.HttpException('Recipient Not Found', common_1.HttpStatus.NOT_FOUND);
        const newConversation = await this.conversationsService.createConversation(user, {
            username: recipient.username,
            message: 'hello',
        });
        this.events.emit('conversation.create', newConversation);
        return newConversation;
    }
};
__decorate([
    (0, common_1.Get)('conversations/:recipientId'),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Param)('recipientId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.User, Number]),
    __metadata("design:returntype", Promise)
], ExistsController.prototype, "checkConversationExists", null);
ExistsController = __decorate([
    (0, common_1.Controller)(constants_1.Routes.EXISTS),
    __param(0, (0, common_1.Inject)(constants_1.Services.CONVERSATIONS)),
    __param(1, (0, common_1.Inject)(constants_1.Services.USERS)),
    __metadata("design:paramtypes", [Object, Object, event_emitter_1.EventEmitter2])
], ExistsController);
exports.ExistsController = ExistsController;
//# sourceMappingURL=exists.controller.js.map