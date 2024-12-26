import { User } from './User';
export declare abstract class BaseMessage {
    id: number;
    content: string;
    createdAt: number;
    author: User;
}
