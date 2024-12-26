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
exports.FriendRequestService = void 0;
const FriendAlreadyExists_1 = require("./../friends/exceptions/FriendAlreadyExists");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const UserNotFound_1 = require("../users/exceptions/UserNotFound");
const constants_1 = require("../utils/constants");
const typeorm_3 = require("../utils/typeorm");
const Friend_1 = require("../utils/typeorm/entities/Friend");
const FriendRequest_1 = require("./exceptions/FriendRequest");
const FriendRequestAccepted_1 = require("./exceptions/FriendRequestAccepted");
const FriendRequestNotFound_1 = require("./exceptions/FriendRequestNotFound");
const FriendRequestPending_1 = require("./exceptions/FriendRequestPending");
let FriendRequestService = class FriendRequestService {
    constructor(friendRepository, friendRequestRepository, userService, friendsService) {
        this.friendRepository = friendRepository;
        this.friendRequestRepository = friendRequestRepository;
        this.userService = userService;
        this.friendsService = friendsService;
    }
    getFriendRequests(id) {
        const status = 'pending';
        return this.friendRequestRepository.find({
            where: [
                { sender: { id }, status },
                { receiver: { id }, status },
            ],
            relations: ['receiver', 'sender', 'receiver.profile', 'sender.profile'],
        });
    }
    async cancel({ id, userId }) {
        const friendRequest = await this.findById(id);
        if (!friendRequest)
            throw new FriendRequestNotFound_1.FriendRequestNotFoundException();
        if (friendRequest.sender.id !== userId)
            throw new FriendRequest_1.FriendRequestException();
        await this.friendRequestRepository.delete(id);
        return friendRequest;
    }
    async create({ user: sender, username }) {
        const receiver = await this.userService.findUser({ username });
        if (!receiver)
            throw new UserNotFound_1.UserNotFoundException();
        const exists = await this.isPending(sender.id, receiver.id);
        if (exists)
            throw new FriendRequestPending_1.FriendRequestPending();
        if (receiver.id === sender.id)
            throw new FriendRequest_1.FriendRequestException('Can not add yourself');
        const isFriends = await this.friendsService.isFriends(sender.id, receiver.id);
        if (isFriends)
            throw new FriendAlreadyExists_1.FriendAlreadyExists();
        const friend = this.friendRequestRepository.create({
            sender,
            receiver,
            status: 'pending',
        });
        return this.friendRequestRepository.save(friend);
    }
    async accept({ id, userId }) {
        const friendRequest = await this.findById(id);
        if (!friendRequest)
            throw new FriendRequestNotFound_1.FriendRequestNotFoundException();
        if (friendRequest.status === 'accepted')
            throw new FriendRequestAccepted_1.FriendRequestAcceptedException();
        if (friendRequest.receiver.id !== userId)
            throw new FriendRequest_1.FriendRequestException();
        friendRequest.status = 'accepted';
        const updatedFriendRequest = await this.friendRequestRepository.save(friendRequest);
        const newFriend = this.friendRepository.create({
            sender: friendRequest.sender,
            receiver: friendRequest.receiver,
        });
        const friend = await this.friendRepository.save(newFriend);
        return { friend, friendRequest: updatedFriendRequest };
    }
    async reject({ id, userId }) {
        const friendRequest = await this.findById(id);
        if (!friendRequest)
            throw new FriendRequestNotFound_1.FriendRequestNotFoundException();
        if (friendRequest.status === 'accepted')
            throw new FriendRequestAccepted_1.FriendRequestAcceptedException();
        if (friendRequest.receiver.id !== userId)
            throw new FriendRequest_1.FriendRequestException();
        friendRequest.status = 'rejected';
        return this.friendRequestRepository.save(friendRequest);
    }
    isPending(userOneId, userTwoId) {
        return this.friendRequestRepository.findOne({
            where: [
                {
                    sender: { id: userOneId },
                    receiver: { id: userTwoId },
                    status: 'pending',
                },
                {
                    sender: { id: userTwoId },
                    receiver: { id: userOneId },
                    status: 'pending',
                },
            ],
        });
    }
    isFriends(userOneId, userTwoId) {
        return this.friendRequestRepository.findOne({
            where: [
                {
                    sender: { id: userOneId },
                    receiver: { id: userTwoId },
                    status: 'accepted',
                },
                {
                    sender: { id: userTwoId },
                    receiver: { id: userOneId },
                    status: 'accepted',
                },
            ],
        });
    }
    findById(id) {
        return this.friendRequestRepository.findOne(id, {
            relations: ['receiver', 'sender'],
        });
    }
};
FriendRequestService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Friend_1.Friend)),
    __param(1, (0, typeorm_1.InjectRepository)(typeorm_3.FriendRequest)),
    __param(2, (0, common_1.Inject)(constants_1.Services.USERS)),
    __param(3, (0, common_1.Inject)(constants_1.Services.FRIENDS_SERVICE)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository, Object, Object])
], FriendRequestService);
exports.FriendRequestService = FriendRequestService;
//# sourceMappingURL=friend-requests.service.js.map