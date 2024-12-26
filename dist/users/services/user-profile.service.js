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
exports.UserProfileService = void 0;
const helpers_1 = require("./../../utils/helpers");
const constants_1 = require("./../../utils/constants");
const typeorm_1 = require("@nestjs/typeorm");
const Profile_1 = require("./../../utils/typeorm/entities/Profile");
const User_1 = require("./../../utils/typeorm/entities/User");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
let UserProfileService = class UserProfileService {
    constructor(profileRepository, userRepository, imageStorageService) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
        this.imageStorageService = imageStorageService;
    }
    createProfile() {
        const newProfile = this.profileRepository.create();
        return this.profileRepository.save(newProfile);
    }
    async createProfileOrUpdate(user, params) {
        if (!user.profile) {
            user.profile = await this.createProfile();
            return this.updateProfile(user, params);
        }
        return this.updateProfile(user, params);
    }
    async updateProfile(user, params) {
        if (params.avatar)
            user.profile.avatar = await this.updateAvatar(params.avatar);
        if (params.banner)
            user.profile.banner = await this.updateBanner(params.banner);
        if (params.about)
            user.profile.about = params.about;
        return this.userRepository.save(user);
    }
    async updateBanner(file) {
        const key = (0, helpers_1.generateUUIDV4)();
        await this.imageStorageService.upload({ key, file });
        return key;
    }
    async updateAvatar(file) {
        const key = (0, helpers_1.generateUUIDV4)();
        await this.imageStorageService.upload({ key, file });
        return key;
    }
};
UserProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Profile_1.Profile)),
    __param(1, (0, typeorm_1.InjectRepository)(User_1.User)),
    __param(2, (0, common_1.Inject)(constants_1.Services.IMAGE_UPLOAD_SERVICE)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository, Object])
], UserProfileService);
exports.UserProfileService = UserProfileService;
//# sourceMappingURL=user-profile.service.js.map