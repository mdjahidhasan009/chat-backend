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
exports.UserPresenceController = void 0;
const common_1 = require("@nestjs/common");
const Guards_1 = require("../../auth/utils/Guards");
const constants_1 = require("../../utils/constants");
const decorators_1 = require("../../utils/decorators");
const typeorm_1 = require("../../utils/typeorm");
const UpdatePresenceStatus_dto_1 = require("../dtos/UpdatePresenceStatus.dto");
let UserPresenceController = class UserPresenceController {
    constructor(userPresenceService) {
        this.userPresenceService = userPresenceService;
    }
    updateStatus(user, { statusMessage }) {
        return this.userPresenceService.updateStatus({ user, statusMessage });
    }
};
__decorate([
    (0, common_1.Patch)('status'),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.User,
        UpdatePresenceStatus_dto_1.UpdatePresenceStatusDto]),
    __metadata("design:returntype", void 0)
], UserPresenceController.prototype, "updateStatus", null);
UserPresenceController = __decorate([
    (0, common_1.UseGuards)(Guards_1.AuthenticatedGuard),
    (0, common_1.Controller)(constants_1.Routes.USER_PRESENCE),
    __param(0, (0, common_1.Inject)(constants_1.Services.USER_PRESENCE)),
    __metadata("design:paramtypes", [Object])
], UserPresenceController);
exports.UserPresenceController = UserPresenceController;
//# sourceMappingURL=user-presence.controller.js.map