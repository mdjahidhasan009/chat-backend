import { CreateGroupParams, FetchGroupsParams } from '../utils/types';
import { Group } from '../utils/typeorm';

export interface IGroupService {
  createGroup(params: CreateGroupParams);
  getGroups(params: FetchGroupsParams): Promise<Group[]>;
}
