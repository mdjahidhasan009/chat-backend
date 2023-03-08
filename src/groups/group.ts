import { CreateGroupParams, FetchGroupsParams } from '../utils/types';
import { Group } from '../utils/typeorm';

export interface IGroupService {
  createGroup(params: CreateGroupParams);
  getGroups(params: FetchGroupsParams): Promise<Group[]>;
  findGroupById(id: number): Promise<Group>;
  saveGroup(group: Group): Promise<Group>;
}
