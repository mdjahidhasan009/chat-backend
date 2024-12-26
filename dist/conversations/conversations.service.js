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
exports.ConversationsService = void 0;
const FriendNotFound_1 = require("../friends/exceptions/FriendNotFound");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const constants_1 = require("../utils/constants");
const typeorm_3 = require("../utils/typeorm");
const ConversationNotFound_1 = require("./exceptions/ConversationNotFound");
const UserNotFound_1 = require("../users/exceptions/UserNotFound");
const CreateConversation_1 = require("./exceptions/CreateConversation");
const ConversationExists_1 = require("./exceptions/ConversationExists");
let ConversationsService = class ConversationsService {
    constructor(conversationRepository, messageRepository, userService, friendsService) {
        this.conversationRepository = conversationRepository;
        this.messageRepository = messageRepository;
        this.userService = userService;
        this.friendsService = friendsService;
    }
    async getConversations(id) {
        return this.conversationRepository
            .createQueryBuilder('conversation')
            .leftJoinAndSelect('conversation.lastMessageSent', 'lastMessageSent')
            .leftJoinAndSelect('conversation.creator', 'creator')
            .leftJoinAndSelect('conversation.recipient', 'recipient')
            .leftJoinAndSelect('creator.peer', 'creatorPeer')
            .leftJoinAndSelect('recipient.peer', 'recipientPeer')
            .leftJoinAndSelect('creator.profile', 'creatorProfile')
            .leftJoinAndSelect('recipient.profile', 'recipientProfile')
            .where('creator.id = :id', { id })
            .orWhere('recipient.id = :id', { id })
            .orderBy('conversation.lastMessageSentAt', 'DESC')
            .getMany();
    }
    async findById(id) {
        return this.conversationRepository.findOne({
            where: { id },
            relations: [
                'creator',
                'recipient',
                'creator.profile',
                'recipient.profile',
                'lastMessageSent',
            ],
        });
    }
    async isCreated(userId, recipientId) {
        return this.conversationRepository.findOne({
            where: [
                {
                    creator: { id: userId },
                    recipient: { id: recipientId },
                },
                {
                    creator: { id: recipientId },
                    recipient: { id: userId },
                },
            ],
        });
    }
    async createConversation(creator, params) {
        const { username, message: content } = params;
        const recipient = await this.userService.findUser({ username });
        if (!recipient)
            throw new UserNotFound_1.UserNotFoundException();
        if (creator.id === recipient.id)
            throw new CreateConversation_1.CreateConversationException('Cannot create Conversation with yourself');
        const isFriends = await this.friendsService.isFriends(creator.id, recipient.id);
        if (!isFriends)
            throw new FriendNotFound_1.FriendNotFoundException();
        const exists = await this.isCreated(creator.id, recipient.id);
        if (exists)
            throw new ConversationExists_1.ConversationExistsException();
        const newConversation = this.conversationRepository.create({
            creator,
            recipient,
        });
        const conversation = await this.conversationRepository.save(newConversation);
        const newMessage = this.messageRepository.create({
            content,
            conversation,
            author: creator,
        });
        await this.messageRepository.save(newMessage);
        return conversation;
    }
    async hasAccess({ id, userId }) {
        const conversation = await this.findById(id);
        if (!conversation)
            throw new ConversationNotFound_1.ConversationNotFoundException();
        return (conversation.creator.id === userId || conversation.recipient.id === userId);
    }
    save(conversation) {
        return this.conversationRepository.save(conversation);
    }
    getMessages({ id, limit, }) {
        return this.conversationRepository
            .createQueryBuilder('conversation')
            .where('id = :id', { id })
            .leftJoinAndSelect('conversation.lastMessageSent', 'lastMessageSent')
            .leftJoinAndSelect('conversation.messages', 'message')
            .where('conversation.id = :id', { id })
            .orderBy('message.createdAt', 'DESC')
            .limit(limit)
            .getOne();
    }
    update({ id, lastMessageSent }) {
        return this.conversationRepository.update(id, { lastMessageSent });
    }
};
ConversationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_3.Conversation)),
    __param(1, (0, typeorm_1.InjectRepository)(typeorm_3.Message)),
    __param(2, (0, common_1.Inject)(constants_1.Services.USERS)),
    __param(3, (0, common_1.Inject)(constants_1.Services.FRIENDS_SERVICE)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository, Object, Object])
], ConversationsService);
exports.ConversationsService = ConversationsService;
//# sourceMappingURL=conversations.service.js.map