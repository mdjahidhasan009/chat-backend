import { Group } from './Group';
import { BaseMessage } from './BaseMessage';
import { MessageAttachment } from './MessageAttachment';
export declare class GroupMessage extends BaseMessage {
    group: Group;
    attachments?: MessageAttachment[];
}
