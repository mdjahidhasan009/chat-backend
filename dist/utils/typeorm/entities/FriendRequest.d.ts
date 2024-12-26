import { FriendRequestStatus } from '../../types';
import { User } from './User';
export declare class FriendRequest {
    id: number;
    sender: User;
    receiver: User;
    createdAt: number;
    status: FriendRequestStatus;
}
