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
exports.UserProfilesController = void 0;
const platform_express_1 = require("@nestjs/platform-express");
const constants_1 = require("./../../utils/constants");
const common_1 = require("@nestjs/common");
const UpdateUserProfile_dto_1 = require("../dtos/UpdateUserProfile.dto");
const decorators_1 = require("../../utils/decorators");
const typeorm_1 = require("../../utils/typeorm");
let UserProfilesController = class UserProfilesController {
    constructor(userProfileService) {
        this.userProfileService = userProfileService;
    }
    async updateUserProfile(user, files, updateUserProfileDto) {
        const params = {};
        updateUserProfileDto.about && (params.about = updateUserProfileDto.about);
        files.banner && (params.banner = files.banner[0]);
        files.avatar && (params.avatar = files.avatar[0]);
        return this.userProfileService.createProfileOrUpdate(user, params);
    }
};
__decorate([
    (0, common_1.Patch)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)(constants_1.UserProfileFileFields)),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.User, Object, UpdateUserProfile_dto_1.UpdateUserProfileDto]),
    __metadata("design:returntype", Promise)
], UserProfilesController.prototype, "updateUserProfile", null);
UserProfilesController = __decorate([
    (0, common_1.Controller)(constants_1.Routes.USERS_PROFILES),
    __param(0, (0, common_1.Inject)(constants_1.Services.USERS_PROFILES)),
    __metadata("design:paramtypes", [Object])
], UserProfilesController);
exports.UserProfilesController = UserProfilesController;
//# sourceMappingURL=user-profile.controller.js.map