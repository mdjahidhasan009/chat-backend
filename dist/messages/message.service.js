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
exports.MessageService = void 0;
const builders_1 = require("../utils/builders");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_transformer_1 = require("class-transformer");
const typeorm_2 = require("typeorm");
const ConversationNotFound_1 = require("../conversations/exceptions/ConversationNotFound");
const constants_1 = require("../utils/constants");
const typeorm_3 = require("../utils/typeorm");
const CannotCreateMessage_1 = require("./exceptions/CannotCreateMessage");
const CannotDeleteMessage_1 = require("./exceptions/CannotDeleteMessage");
const FriendNotFound_1 = require("../friends/exceptions/FriendNotFound");
let MessageService = class MessageService {
    constructor(messageRepository, conversationService, messageAttachmentsService, friendsService) {
        this.messageRepository = messageRepository;
        this.conversationService = conversationService;
        this.messageAttachmentsService = messageAttachmentsService;
        this.friendsService = friendsService;
    }
    async createMessage(params) {
        const { user, content, id } = params;
        const conversation = await this.conversationService.findById(id);
        if (!conversation)
            throw new ConversationNotFound_1.ConversationNotFoundException();
        const { creator, recipient } = conversation;
        const isFriend = await this.friendsService.isFriends(creator.id, recipient.id);
        if (!isFriend)
            throw new FriendNotFound_1.FriendNotFoundException();
        if (creator.id !== user.id && recipient.id !== user.id)
            throw new CannotCreateMessage_1.CannotCreateMessageException();
        const message = this.messageRepository.create({
            content,
            conversation,
            author: (0, class_transformer_1.instanceToPlain)(user),
            attachments: params.attachments
                ? await this.messageAttachmentsService.create(params.attachments)
                : [],
        });
        const savedMessage = await this.messageRepository.save(message);
        conversation.lastMessageSent = savedMessage;
        const updated = await this.conversationService.save(conversation);
        return { message: savedMessage, conversation: updated };
    }
    getMessages(conversationId) {
        return this.messageRepository.find({
            relations: ['author', 'attachments', 'author.profile'],
            where: { conversation: { id: conversationId } },
            order: { createdAt: 'DESC' },
        });
    }
    async deleteMessage(params) {
        const { conversationId } = params;
        const msgParams = { id: conversationId, limit: 5 };
        const conversation = await this.conversationService.getMessages(msgParams);
        if (!conversation)
            throw new ConversationNotFound_1.ConversationNotFoundException();
        const findMessageParams = (0, builders_1.buildFindMessageParams)(params);
        const message = await this.messageRepository.findOne(findMessageParams);
        if (!message)
            throw new CannotDeleteMessage_1.CannotDeleteMessage();
        if (conversation.lastMessageSent.id !== message.id)
            return this.messageRepository.delete({ id: message.id });
        return this.deleteLastMessage(conversation, message);
    }
    async deleteLastMessage(conversation, message) {
        const size = conversation.messages.length;
        const SECOND_MESSAGE_INDEX = 1;
        if (size <= 1) {
            console.log('Last Message Sent is deleted');
            await this.conversationService.update({
                id: conversation.id,
                lastMessageSent: null,
            });
            return this.messageRepository.delete({ id: message.id });
        }
        else {
            console.log('There are more than 1 message');
            const newLastMessage = conversation.messages[SECOND_MESSAGE_INDEX];
            await this.conversationService.update({
                id: conversation.id,
                lastMessageSent: newLastMessage,
            });
            return this.messageRepository.delete({ id: message.id });
        }
    }
    async editMessage(params) {
        const messageDB = await this.messageRepository.findOne({
            where: {
                id: params.messageId,
                author: { id: params.userId },
            },
            relations: [
                'conversation',
                'conversation.creator',
                'conversation.recipient',
                'author',
                'author.profile',
            ],
        });
        if (!messageDB)
            throw new common_1.HttpException('Cannot Edit Message', common_1.HttpStatus.BAD_REQUEST);
        messageDB.content = params.content;
        return this.messageRepository.save(messageDB);
    }
};
MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_3.Message)),
    __param(1, (0, common_1.Inject)(constants_1.Services.CONVERSATIONS)),
    __param(2, (0, common_1.Inject)(constants_1.Services.MESSAGE_ATTACHMENTS)),
    __param(3, (0, common_1.Inject)(constants_1.Services.FRIENDS_SERVICE)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object, Object, Object])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map