import { User } from './User';
import { GroupMessage } from './GroupMessage';
export declare class Group {
    id: number;
    title?: string;
    users: User[];
    creator: User;
    owner: User;
    messages: GroupMessage[];
    createdAt: number;
    lastMessageSent: GroupMessage;
    lastMessageSentAt: Date;
    avatar?: string;
}
