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
exports.GroupRecipientService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../utils/constants");
const GroupNotFound_1 = require("../exceptions/GroupNotFound");
const NotGroupOwner_1 = require("../exceptions/NotGroupOwner");
const GroupParticipantNotFound_1 = require("../exceptions/GroupParticipantNotFound");
let GroupRecipientService = class GroupRecipientService {
    constructor(userService, groupService) {
        this.userService = userService;
        this.groupService = groupService;
    }
    async addGroupRecipient(params) {
        const group = await this.groupService.findGroupById(params.id);
        if (!group)
            throw new GroupNotFound_1.GroupNotFoundException();
        if (group.owner.id !== params.userId)
            throw new common_1.HttpException('Insufficient Permissions', common_1.HttpStatus.FORBIDDEN);
        const recipient = await this.userService.findUser({ username: params.username });
        if (!recipient)
            throw new common_1.HttpException('Cannot Add User', common_1.HttpStatus.BAD_REQUEST);
        if (group.creator.id !== params.userId)
            throw new common_1.HttpException('Insufficient Permissions', common_1.HttpStatus.FORBIDDEN);
        const inGroup = group.users.find((user) => user.id === recipient.id);
        if (inGroup)
            throw new common_1.HttpException('User already in group', common_1.HttpStatus.BAD_REQUEST);
        group.users = [...group.users, recipient];
        const savedGroup = await this.groupService.saveGroup(group);
        return { group: savedGroup, user: recipient };
    }
    async removeGroupRecipient(params) {
        const { issuerId, removeUserId, id } = params;
        const userToBeRemoved = await this.userService.findUser({
            id: removeUserId,
        });
        if (!userToBeRemoved)
            throw new common_1.HttpException('User cannot be removed', common_1.HttpStatus.BAD_REQUEST);
        const group = await this.groupService.findGroupById(id);
        if (!group)
            throw new GroupNotFound_1.GroupNotFoundException();
        if (group.owner.id !== issuerId)
            throw new NotGroupOwner_1.NotGroupOwnerException();
        if (group.owner.id === removeUserId)
            throw new common_1.HttpException('Cannot remove yourself as owner', common_1.HttpStatus.BAD_REQUEST);
        group.users = group.users.filter((u) => u.id !== removeUserId);
        const savedGroup = await this.groupService.saveGroup(group);
        return { group: savedGroup, user: userToBeRemoved };
    }
    async isUserInGroup({ id, userId }) {
        const group = await this.groupService.findGroupById(id);
        if (!group)
            throw new GroupNotFound_1.GroupNotFoundException();
        const user = group.users.find((user) => user.id === userId);
        if (!user)
            throw new GroupParticipantNotFound_1.GroupParticipantNotFound();
        return group;
    }
    async leaveGroup({ id, userId }) {
        const group = await this.isUserInGroup({ id, userId });
        if (group.owner.id === userId)
            throw new common_1.HttpException('Cannot leave group as owner', common_1.HttpStatus.BAD_REQUEST);
        group.users = group.users.filter((user) => user.id !== userId);
        return this.groupService.saveGroup(group);
    }
};
GroupRecipientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.Services.USERS)),
    __param(1, (0, common_1.Inject)(constants_1.Services.GROUPS)),
    __metadata("design:paramtypes", [Object, Object])
], GroupRecipientService);
exports.GroupRecipientService = GroupRecipientService;
//# sourceMappingURL=group-recipient.service.js.map