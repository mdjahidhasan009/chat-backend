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
exports.ConversationsController = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const Guards_1 = require("../auth/utils/Guards");
const constants_1 = require("../utils/constants");
const decorators_1 = require("../utils/decorators");
const typeorm_1 = require("../utils/typeorm");
const CreateConversation_dto_1 = require("./dtos/CreateConversation.dto");
const throttler_1 = require("@nestjs/throttler");
let ConversationsController = class ConversationsController {
    constructor(conversationsService, events) {
        this.conversationsService = conversationsService;
        this.events = events;
    }
    test() {
        return;
    }
    async createConversation(user, createConversationPayload) {
        const conversation = await this.conversationsService.createConversation(user, createConversationPayload);
        this.events.emit('conversation.create', conversation);
        return conversation;
    }
    async getConversations({ id }) {
        return this.conversationsService.getConversations(id);
    }
    async getConversationById(id) {
        const conversation = await this.conversationsService.findById(id);
        return conversation;
    }
};
__decorate([
    (0, common_1.Get)('test/endpoint/check'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ConversationsController.prototype, "test", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.User,
        CreateConversation_dto_1.CreateConversationDto]),
    __metadata("design:returntype", Promise)
], ConversationsController.prototype, "createConversation", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.User]),
    __metadata("design:returntype", Promise)
], ConversationsController.prototype, "getConversations", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ConversationsController.prototype, "getConversationById", null);
ConversationsController = __decorate([
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.Controller)(constants_1.Routes.CONVERSATIONS),
    (0, common_1.UseGuards)(Guards_1.AuthenticatedGuard),
    __param(0, (0, common_1.Inject)(constants_1.Services.CONVERSATIONS)),
    __metadata("design:paramtypes", [Object, event_emitter_1.EventEmitter2])
], ConversationsController);
exports.ConversationsController = ConversationsController;
//# sourceMappingURL=conversations.controller.js.map