import { CreateGroupMessageParams } from '../utils/types';
import { GroupMessage } from '../utils/typeorm';

export interface IGroupMessagesService {
  createGroupMessage(params: CreateGroupMessageParams);
  getGroupMessages(id: number): Promise<GroupMessage[]>;
}