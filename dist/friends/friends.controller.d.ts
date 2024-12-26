import { IFriendsService } from './friends';
import { User } from '../utils/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class FriendsController {
    private readonly friendsService;
    private readonly event;
    constructor(friendsService: IFriendsService, event: EventEmitter2);
    getFriends(user: User): Promise<import("../utils/typeorm").Friend[]>;
    deleteFriend({ id: userId }: User, id: number): Promise<any>;
}
