import { EventEmitter2 } from '@nestjs/event-emitter';
import { IConversationsService } from '../conversations/conversations';
import { IUserService } from '../users/interfaces/user';
import { User } from '../utils/typeorm';
export declare class ExistsController {
    private readonly conversationsService;
    private readonly userService;
    private readonly events;
    constructor(conversationsService: IConversationsService, userService: IUserService, events: EventEmitter2);
    checkConversationExists(user: User, recipientId: number): Promise<import("../utils/typeorm").Conversation>;
}
