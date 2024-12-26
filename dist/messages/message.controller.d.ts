import { Attachment } from "../utils/types";
import { IMessageService } from './message';
import { CreateMessageDto } from './dtos/CreateMessage.dto';
import { User } from '../utils/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EditMessageDto } from './dtos/EditMessage.dto';
export declare class MessageController {
    private readonly messageService;
    private eventEmitter;
    constructor(messageService: IMessageService, eventEmitter: EventEmitter2);
    createMessage(user: User, id: number, { content }: CreateMessageDto, { attachments }: {
        attachments: Attachment[];
    }): Promise<void>;
    getMessagesFromConversation(user: User, id: number): Promise<{
        id: number;
        messages: import("../utils/typeorm").Message[];
    }>;
    deleteMessageFromConversation(user: User, conversationId: number, messageId: number): Promise<{
        conversationId: number;
        messageId: number;
    }>;
    editMessage({ id: userId }: User, conversationId: number, messageId: number, { content }: EditMessageDto): Promise<import("../utils/typeorm").Message>;
}
