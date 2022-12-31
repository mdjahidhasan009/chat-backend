import { Injectable } from '@nestjs/common';
import { IConversationsService } from './conversations';
import { CreateConversationParams } from '../utils/types';

@Injectable()
export class ConversationsService implements IConversationsService{
  createConversation(params: CreateConversationParams) {}
}
