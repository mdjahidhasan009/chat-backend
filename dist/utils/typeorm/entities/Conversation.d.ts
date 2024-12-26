import { User } from './User';
import { Message } from './Message';
export declare class Conversation {
    id: number;
    creator: User;
    recipient: User;
    messages: Message[];
    createdAt: number;
    lastMessageSent: Message;
    lastMessageSentAt: Date;
}
