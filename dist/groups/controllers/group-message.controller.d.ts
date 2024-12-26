import { Attachment } from './../../utils/types';
import { IGroupMessagesService } from '../interfaces/group-messages';
import { User } from '../../utils/typeorm';
import { CreateMessageDto } from '../../messages/dtos/CreateMessage.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EditMessageDto } from "../../messages/dtos/EditMessage.dto";
export declare class GroupMessageController {
    private readonly groupMessageService;
    private readonly eventEmitter;
    constructor(groupMessageService: IGroupMessagesService, eventEmitter: EventEmitter2);
    createGroupMessage(user: User, { attachments }: {
        attachments: Attachment[];
    }, id: number, { content }: CreateMessageDto): Promise<void>;
    getGroupMessages(user: User, id: number): Promise<{
        id: number;
        messages: import("../../utils/typeorm").GroupMessage[];
    }>;
    deleteGroupMessage(user: User, groupId: number, messageId: number): Promise<{
        groupId: number;
        messageId: number;
    }>;
    editGroupMessage({ id: userId }: User, groupId: number, messageId: number, { content }: EditMessageDto): Promise<import("../../utils/typeorm").GroupMessage>;
}
