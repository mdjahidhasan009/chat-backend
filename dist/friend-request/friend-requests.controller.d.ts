import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from '../utils/typeorm';
import { CreateFriendDto } from './dtos/CreateFriend.dto';
import { IFriendRequestService } from './friend-requests';
export declare class FriendRequestController {
    private readonly friendRequestService;
    private event;
    constructor(friendRequestService: IFriendRequestService, event: EventEmitter2);
    getFriendRequests(user: User): Promise<import("../utils/typeorm").FriendRequest[]>;
    createFriendRequest(user: User, { username }: CreateFriendDto): Promise<any>;
    acceptFriendRequest({ id: userId }: User, id: number): Promise<import("../utils/types").AcceptFriendRequestResponse>;
    cancelFriendRequest({ id: userId }: User, id: number): Promise<import("../utils/typeorm").FriendRequest>;
    rejectFriendRequest({ id: userId }: User, id: number): Promise<import("../utils/typeorm").FriendRequest>;
}
