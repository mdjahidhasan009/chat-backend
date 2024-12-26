import { MessagingGateway } from '../gateway/gateway';
import { FriendRequest } from '../utils/typeorm';
import { AcceptFriendRequestResponse } from '../utils/types';
export declare class FriendRequestsEvents {
    private readonly gateway;
    constructor(gateway: MessagingGateway);
    friendRequestCreate(payload: FriendRequest): void;
    handleFriendRequestCancel(payload: FriendRequest): void;
    handleFriendRequestAccepted(payload: AcceptFriendRequestResponse): void;
    handleFriendRequestRejected(payload: FriendRequest): void;
}
