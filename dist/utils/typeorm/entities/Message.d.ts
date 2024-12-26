import { Conversation } from './Conversation';
import { BaseMessage } from './BaseMessage';
import { MessageAttachment } from './MessageAttachment';
export declare class Message extends BaseMessage {
    conversation: Conversation;
    attachments: MessageAttachment[];
}
