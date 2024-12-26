import { IFriendsService } from './../friends/friends';
import { Repository } from 'typeorm';
import { IUserService } from '../users/interfaces/user';
import { FriendRequest } from '../utils/typeorm';
import { Friend } from '../utils/typeorm/entities/Friend';
import { CancelFriendRequestParams, CreateFriendParams, FriendRequestParams } from '../utils/types';
import { IFriendRequestService } from './friend-requests';
export declare class FriendRequestService implements IFriendRequestService {
    private readonly friendRepository;
    private readonly friendRequestRepository;
    private readonly userService;
    private readonly friendsService;
    constructor(friendRepository: Repository<Friend>, friendRequestRepository: Repository<FriendRequest>, userService: IUserService, friendsService: IFriendsService);
    getFriendRequests(id: number): Promise<FriendRequest[]>;
    cancel({ id, userId }: CancelFriendRequestParams): Promise<FriendRequest>;
    create({ user: sender, username }: CreateFriendParams): Promise<FriendRequest>;
    accept({ id, userId }: FriendRequestParams): Promise<{
        friend: Friend;
        friendRequest: FriendRequest;
    }>;
    reject({ id, userId }: CancelFriendRequestParams): Promise<FriendRequest>;
    isPending(userOneId: number, userTwoId: number): Promise<FriendRequest>;
    isFriends(userOneId: number, userTwoId: number): Promise<FriendRequest>;
    findById(id: number): Promise<FriendRequest>;
}
