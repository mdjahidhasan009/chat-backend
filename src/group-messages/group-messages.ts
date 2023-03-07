import { CreateGroupMessageParams } from '../utils/types';

export interface IGroupMessagesService {
  createGroupMessage(params: CreateGroupMessageParams);
}