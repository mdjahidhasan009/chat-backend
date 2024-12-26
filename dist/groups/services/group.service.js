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
exports.GroupService = void 0;
const helpers_1 = require("./../../utils/helpers");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const UserNotFound_1 = require("../../users/exceptions/UserNotFound");
const constants_1 = require("../../utils/constants");
const typeorm_3 = require("../../utils/typeorm");
const GroupNotFound_1 = require("../exceptions/GroupNotFound");
const GroupOwnerTransfer_1 = require("../exceptions/GroupOwnerTransfer");
let GroupService = class GroupService {
    constructor(groupRepository, userService, imageStorageService) {
        this.groupRepository = groupRepository;
        this.userService = userService;
        this.imageStorageService = imageStorageService;
    }
    async createGroup(params) {
        const { creator, title } = params;
        const usersPromise = params.users.map((username) => this.userService.findUser({ username }));
        const users = (await Promise.all(usersPromise)).filter((user) => user);
        users.push(creator);
        const groupParams = { owner: creator, users, creator, title };
        const group = this.groupRepository.create(groupParams);
        return this.groupRepository.save(group);
    }
    getGroups(params) {
        return this.groupRepository
            .createQueryBuilder('group')
            .leftJoinAndSelect('group.users', 'user')
            .where('user.id IN (:users)', { users: [params.userId] })
            .leftJoinAndSelect('group.users', 'users')
            .leftJoinAndSelect('group.creator', 'creator')
            .leftJoinAndSelect('group.owner', 'owner')
            .leftJoinAndSelect('group.lastMessageSent', 'lastMessageSent')
            .leftJoinAndSelect('users.profile', 'usersProfile')
            .leftJoinAndSelect('users.presence', 'usersPresence')
            .orderBy('group.lastMessageSentAt', 'DESC')
            .getMany();
    }
    findGroupById(id) {
        return this.groupRepository.findOne({
            where: { id },
            relations: [
                'creator',
                'users',
                'lastMessageSent',
                'owner',
                'users.profile',
                'users.presence',
            ],
        });
    }
    saveGroup(group) {
        return this.groupRepository.save(group);
    }
    async hasAccess({ id, userId }) {
        const group = await this.findGroupById(id);
        if (!group)
            throw new GroupNotFound_1.GroupNotFoundException();
        return group.users.find((user) => user.id === userId);
    }
    async transferGroupOwner({ userId, groupId, newOwnerId, }) {
        const group = await this.findGroupById(groupId);
        if (!group)
            throw new GroupNotFound_1.GroupNotFoundException();
        if (group.owner.id !== userId)
            throw new GroupOwnerTransfer_1.GroupOwnerTransferException('Insufficient Permissions');
        if (group.owner.id === newOwnerId)
            throw new GroupOwnerTransfer_1.GroupOwnerTransferException('Cannot Transfer Owner to yourself');
        const newOwner = await this.userService.findUser({ id: newOwnerId });
        if (!newOwner)
            throw new UserNotFound_1.UserNotFoundException();
        group.owner = newOwner;
        return this.groupRepository.save(group);
    }
    async updateDetails(params) {
        var _a;
        const group = await this.findGroupById(params.id);
        if (!group)
            throw new GroupNotFound_1.GroupNotFoundException();
        if (params.avatar) {
            const key = (0, helpers_1.generateUUIDV4)();
            await this.imageStorageService.upload({ key, file: params.avatar });
            group.avatar = key;
        }
        group.title = (_a = params.title) !== null && _a !== void 0 ? _a : group.title;
        return this.groupRepository.save(group);
    }
};
GroupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_3.Group)),
    __param(1, (0, common_1.Inject)(constants_1.Services.USERS)),
    __param(2, (0, common_1.Inject)(constants_1.Services.IMAGE_UPLOAD_SERVICE)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object, Object])
], GroupService);
exports.GroupService = GroupService;
//# sourceMappingURL=group.service.js.map