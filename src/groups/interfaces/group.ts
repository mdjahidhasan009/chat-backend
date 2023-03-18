import {
  AccessParams,
  CreateGroupParams,
  FetchGroupsParams,
} from '../../utils/types';
import { Group, User } from '../../utils/typeorm';

export interface IGroupService {
  createGroup(params: CreateGroupParams);
  getGroups(params: FetchGroupsParams): Promise<Group[]>;
  findGroupById(id: number): Promise<Group>;
  saveGroup(group: Group): Promise<Group>;
  hasAccess(params: AccessParams): Promise<User | undefined>;
}
