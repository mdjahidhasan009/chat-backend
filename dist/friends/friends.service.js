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
exports.FriendsService = void 0;
const DeleteFriend_1 = require("./exceptions/DeleteFriend");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const typeorm_3 = require("../utils/typeorm");
const FriendNotFound_1 = require("./exceptions/FriendNotFound");
let FriendsService = class FriendsService {
    constructor(friendsRepository) {
        this.friendsRepository = friendsRepository;
    }
    getFriends(id) {
        return this.friendsRepository.find({
            where: [{ sender: { id } }, { receiver: { id } }],
            relations: [
                'sender',
                'receiver',
                'sender.profile',
                'receiver.profile',
                'receiver.presence',
                'sender.presence',
            ],
        });
    }
    findFriendById(id) {
        return this.friendsRepository.findOne(id, {
            relations: [
                'sender',
                'receiver',
                'sender.profile',
                'sender.presence',
                'receiver.profile',
                'receiver.presence',
            ],
        });
    }
    async deleteFriend({ id, userId }) {
        const friend = await this.findFriendById(id);
        if (!friend)
            throw new FriendNotFound_1.FriendNotFoundException();
        if (friend.receiver.id !== userId && friend.sender.id !== userId)
            throw new DeleteFriend_1.DeleteFriendException();
        await this.friendsRepository.delete(id);
        return friend;
    }
    isFriends(userOneId, userTwoId) {
        return this.friendsRepository.findOne({
            where: [
                {
                    sender: { id: userOneId },
                    receiver: { id: userTwoId },
                },
                {
                    sender: { id: userTwoId },
                    receiver: { id: userOneId },
                },
            ],
        });
    }
};
FriendsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_3.Friend)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FriendsService);
exports.FriendsService = FriendsService;
//# sourceMappingURL=friends.service.js.map