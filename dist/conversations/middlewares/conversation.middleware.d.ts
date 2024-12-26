import { NestMiddleware } from '@nestjs/common';
import { IConversationsService } from '../conversations';
import { AuthenticatedRequest } from '../../utils/types';
import { NextFunction } from 'express';
export declare class ConversationMiddleware implements NestMiddleware {
    private readonly conversationService;
    constructor(conversationService: IConversationsService);
    use(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
}
