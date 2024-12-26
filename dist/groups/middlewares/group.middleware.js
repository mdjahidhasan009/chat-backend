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
exports.GroupMiddleware = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../utils/constants");
const InvalidGroup_1 = require("../exceptions/InvalidGroup");
const GroupNotFound_1 = require("../exceptions/GroupNotFound");
let GroupMiddleware = class GroupMiddleware {
    constructor(groupService) {
        this.groupService = groupService;
    }
    async use(req, res, next) {
        const { id: userId } = req.user;
        const id = parseInt(req.params.id);
        if (isNaN(id))
            throw new InvalidGroup_1.InvalidGroupException();
        const params = { userId, id };
        const user = await this.groupService.hasAccess(params);
        if (user)
            next();
        else
            throw new GroupNotFound_1.GroupNotFoundException();
    }
};
GroupMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.Services.GROUPS)),
    __metadata("design:paramtypes", [Object])
], GroupMiddleware);
exports.GroupMiddleware = GroupMiddleware;
//# sourceMappingURL=group.middleware.js.map