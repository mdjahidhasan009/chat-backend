import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from '../utils/typeorm';
import { IConversationsService } from './conversations';
import { CreateConversationDto } from './dtos/CreateConversation.dto';
export declare class ConversationsController {
    private readonly conversationsService;
    private readonly events;
    constructor(conversationsService: IConversationsService, events: EventEmitter2);
    test(): void;
    createConversation(user: User, createConversationPayload: CreateConversationDto): Promise<import("../utils/typeorm").Conversation>;
    getConversations({ id }: User): Promise<import("../utils/typeorm").Conversation[]>;
    getConversationById(id: number): Promise<import("../utils/typeorm").Conversation>;
}
