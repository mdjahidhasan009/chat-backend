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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupMessageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_transformer_1 = require("class-transformer");
const typeorm_2 = require("typeorm");
const constants_1 = require("../../utils/constants");
const typeorm_3 = require("../../utils/typeorm");
let GroupMessageService = class GroupMessageService {
    constructor(groupMessageRepository, groupRepository, groupService, messageAttachmentsService) {
        this.groupMessageRepository = groupMessageRepository;
        this.groupRepository = groupRepository;
        this.groupService = groupService;
        this.messageAttachmentsService = messageAttachmentsService;
    }
    async createGroupMessage(_a) {
        var { groupId: id } = _a, params = __rest(_a, ["groupId"]);
        const { content, author } = params;
        const group = await this.groupService.findGroupById(id);
        if (!group)
            throw new common_1.HttpException('No Group Found', common_1.HttpStatus.BAD_REQUEST);
        const findUser = group.users.find((u) => u.id === author.id);
        if (!findUser)
            throw new common_1.HttpException('User not in group', common_1.HttpStatus.BAD_REQUEST);
        const groupMessage = this.groupMessageRepository.create({
            content,
            group,
            author: (0, class_transformer_1.instanceToPlain)(author),
            attachments: params.attachments
                ? await this.messageAttachmentsService.createGroupAttachments(params.attachments)
                : [],
        });
        const savedMessage = await this.groupMessageRepository.save(groupMessage);
        group.lastMessageSent = savedMessage;
        const updatedGroup = await this.groupService.saveGroup(group);
        return { message: savedMessage, group: updatedGroup };
    }
    getGroupMessages(id) {
        return this.groupMessageRepository.find({
            where: { group: { id } },
            relations: ['author', 'attachments', 'author.profile'],
            order: {
                createdAt: 'DESC',
            },
        });
    }
    async deleteGroupMessage(params) {
        const group = await this.groupRepository
            .createQueryBuilder('group')
            .where('group.id = :groupId', { groupId: params.groupId })
            .leftJoinAndSelect('group.lastMessageSent', 'lastMessageSent')
            .leftJoinAndSelect('group.messages', 'messages')
            .orderBy('messages.createdAt', 'DESC')
            .limit(5)
            .getOne();
        if (!group)
            throw new common_1.HttpException('Group not found', common_1.HttpStatus.BAD_REQUEST);
        const message = await this.groupMessageRepository.findOne({
            id: params.messageId,
            author: { id: params.userId },
            group: { id: params.groupId },
        });
        if (!message)
            throw new common_1.HttpException('Cannot delete message', common_1.HttpStatus.BAD_REQUEST);
        if (group.lastMessageSent.id !== message.id)
            return this.groupMessageRepository.delete({ id: message.id });
        const size = group.messages.length;
        const SECOND_MESSAGE_INDEX = 1;
        if (size <= 1) {
            await this.groupRepository.update({ id: params.groupId }, { lastMessageSent: null });
            return this.groupMessageRepository.delete({ id: message.id });
        }
        else {
            const newLastMessage = group.messages[SECOND_MESSAGE_INDEX];
            await this.groupRepository.update({ id: params.groupId }, { lastMessageSent: newLastMessage });
            return this.groupMessageRepository.delete({ id: message.id });
        }
    }
    async editGroupMessage(params) {
        const messageDB = await this.groupMessageRepository.findOne({
            where: {
                id: params.messageId,
                author: { id: params.userId },
            },
            relations: ['group', 'group.creator', 'group.users', 'author'],
        });
        if (!messageDB)
            throw new common_1.HttpException('Cannot Edit Message', common_1.HttpStatus.BAD_REQUEST);
        messageDB.content = params.content;
        return this.groupMessageRepository.save(messageDB);
    }
};
GroupMessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_3.GroupMessage)),
    __param(1, (0, typeorm_1.InjectRepository)(typeorm_3.Group)),
    __param(2, (0, common_1.Inject)(constants_1.Services.GROUPS)),
    __param(3, (0, common_1.Inject)(constants_1.Services.MESSAGE_ATTACHMENTS)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository, Object, Object])
], GroupMessageService);
exports.GroupMessageService = GroupMessageService;
//# sourceMappingURL=group-message.service.js.map