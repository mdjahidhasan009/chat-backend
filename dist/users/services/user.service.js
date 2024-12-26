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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const helpers_1 = require("../../utils/helpers");
const typeorm_3 = require("../../utils/typeorm");
let UserService = class UserService {
    constructor(userRepository, peerRepository) {
        this.userRepository = userRepository;
        this.peerRepository = peerRepository;
    }
    async createUser(userDetails) {
        const existingUser = await this.userRepository.findOne({
            username: userDetails.username,
        });
        if (existingUser)
            throw new common_1.HttpException('User already exists', common_1.HttpStatus.CONFLICT);
        const password = await (0, helpers_1.hashPassword)(userDetails.password);
        const peer = this.peerRepository.create();
        const params = Object.assign(Object.assign({}, userDetails), { password, peer });
        const newUser = this.userRepository.create(params);
        return this.userRepository.save(newUser);
    }
    async findUser(params, options) {
        const selections = [
            'email',
            'username',
            'firstName',
            'lastName',
            'id',
        ];
        const selectionsWithPassword = [...selections, 'password'];
        return this.userRepository.findOne(params, {
            select: (options === null || options === void 0 ? void 0 : options.selectAll) ? selectionsWithPassword : selections,
            relations: ['profile', 'presence', 'peer'],
        });
    }
    async saveUser(user) {
        return this.userRepository.save(user);
    }
    async searchUsers(query) {
        const statement = '(user.username LIKE :query)';
        return this.userRepository
            .createQueryBuilder('user')
            .where(statement, { query: `%${query}%` })
            .limit(10)
            .select([
            'user.username',
            'user.firstName',
            'user.lastName',
            'user.email',
            'user.id',
            'user.profile',
        ])
            .getMany();
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_3.User)),
    __param(1, (0, typeorm_1.InjectRepository)(typeorm_3.Peer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map