import { MessagingGateway } from './../gateway/gateway';
import { RemoveFriendEventPayload } from './../utils/types';
export declare class FriendEvents {
    private readonly gateway;
    constructor(gateway: MessagingGateway);
    handleFriendRemoved({ userId, friend }: RemoveFriendEventPayload): void;
}
