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
exports.UserPresenceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const constants_1 = require("../../utils/constants");
const typeorm_3 = require("../../utils/typeorm");
let UserPresenceService = class UserPresenceService {
    constructor(userPresenceRepository, userService) {
        this.userPresenceRepository = userPresenceRepository;
        this.userService = userService;
    }
    createPresence() {
        return this.userPresenceRepository.save(this.userPresenceRepository.create());
    }
    async updateStatus({ user, statusMessage, }) {
        if (!user.presence) {
            user.presence = await this.createPresence();
        }
        user.presence.statusMessage = statusMessage;
        return this.userService.saveUser(user);
    }
};
UserPresenceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_3.UserPresence)),
    __param(1, (0, common_1.Inject)(constants_1.Services.USERS)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], UserPresenceService);
exports.UserPresenceService = UserPresenceService;
//# sourceMappingURL=user-presence.service.js.map