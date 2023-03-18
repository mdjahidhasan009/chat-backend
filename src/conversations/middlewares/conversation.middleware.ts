import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Services } from '../../utils/constants';
import { IConversationsService } from '../conversations';
import { AuthenticatedRequest } from '../../utils/types';
import { NextFunction } from 'express';
import { InvalidConversationIdException } from '../exceptions/InvalidConversationId';
import { ConversationNotFoundException } from '../exceptions/ConversationNotFound';

@Injectable()
export class ConversationMiddleware implements NestMiddleware {
  constructor(
    @Inject(Services.CONVERSATIONS)
    private readonly conversationService: IConversationsService,
  ) {}

  async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { id: userId } = req.user;
    const id = parseInt(req.params.id);
    if (isNaN(id)) throw new InvalidConversationIdException();
    const params = { userId, id };
    const isReadable = await this.conversationService.hasAccess(params);
    if (isReadable) next();
    else throw new ConversationNotFoundException();
  }
}
