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
exports.GroupController = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const platform_express_1 = require("@nestjs/platform-express");
const throttler_1 = require("@nestjs/throttler");
const constants_1 = require("../../utils/constants");
const decorators_1 = require("../../utils/decorators");
const typeorm_1 = require("../../utils/typeorm");
const CreateGroup_dto_1 = require("../dtos/CreateGroup.dto");
const UpdateGroupDetails_dto_1 = require("../dtos/UpdateGroupDetails.dto");
const TransferOwner_dto_1 = require("../dtos/TransferOwner.dto");
let GroupController = class GroupController {
    constructor(groupService, eventEmitter) {
        this.groupService = groupService;
        this.eventEmitter = eventEmitter;
    }
    async createGroup(user, payload) {
        const group = await this.groupService.createGroup(Object.assign(Object.assign({}, payload), { creator: user }));
        this.eventEmitter.emit('group.create', group);
        return group;
    }
    getGroups(user) {
        return this.groupService.getGroups({ userId: user.id });
    }
    getGroup(user, id) {
        return this.groupService.findGroupById(id);
    }
    async updateGroupOwner({ id: userId }, groupId, { newOwnerId }) {
        const params = { groupId, userId, newOwnerId };
        const group = await this.groupService.transferGroupOwner(params);
        this.eventEmitter.emit('group.owner.update', group);
        return group;
    }
    async updateGroupDetails({ title }, id, avatar) {
        return this.groupService.updateDetails({ id, avatar, title });
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.User, CreateGroup_dto_1.CreateGroupDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "createGroup", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.User]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "getGroups", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.User, Number]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "getGroup", null);
__decorate([
    (0, common_1.Patch)(':id/owner'),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.User, Number, TransferOwner_dto_1.TransferOwnerDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "updateGroupOwner", null);
__decorate([
    (0, common_1.Patch)(':id/details'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateGroupDetails_dto_1.UpdateGroupDetailsDto, Number, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "updateGroupDetails", null);
GroupController = __decorate([
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.Controller)(constants_1.Routes.GROUPS),
    __param(0, (0, common_1.Inject)(constants_1.Services.GROUPS)),
    __metadata("design:paramtypes", [Object, event_emitter_1.EventEmitter2])
], GroupController);
exports.GroupController = GroupController;
//# sourceMappingURL=group.controller.js.map