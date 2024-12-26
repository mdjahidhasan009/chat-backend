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
exports.ConversationMiddleware = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../utils/constants");
const InvalidConversationId_1 = require("../exceptions/InvalidConversationId");
const ConversationNotFound_1 = require("../exceptions/ConversationNotFound");
let ConversationMiddleware = class ConversationMiddleware {
    constructor(conversationService) {
        this.conversationService = conversationService;
    }
    async use(req, res, next) {
        const { id: userId } = req.user;
        const id = parseInt(req.params.id);
        if (isNaN(id))
            throw new InvalidConversationId_1.InvalidConversationIdException();
        const params = { userId, id };
        const isReadable = await this.conversationService.hasAccess(params);
        if (isReadable)
            next();
        else
            throw new ConversationNotFound_1.ConversationNotFoundException();
    }
};
ConversationMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.Services.CONVERSATIONS)),
    __metadata("design:paramtypes", [Object])
], ConversationMiddleware);
exports.ConversationMiddleware = ConversationMiddleware;
//# sourceMappingURL=conversation.middleware.js.map