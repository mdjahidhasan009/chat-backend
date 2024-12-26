import { AccessParams, CreateGroupParams, FetchGroupsParams, TransferOwnerParams, UpdateGroupDetailsParams } from '../../utils/types';
import { Group, User } from '../../utils/typeorm';
export interface IGroupService {
    createGroup(params: CreateGroupParams): any;
    getGroups(params: FetchGroupsParams): Promise<Group[]>;
    findGroupById(id: number): Promise<Group>;
    saveGroup(group: Group): Promise<Group>;
    hasAccess(params: AccessParams): Promise<User | undefined>;
    transferGroupOwner(params: TransferOwnerParams): Promise<Group>;
    updateDetails(params: UpdateGroupDetailsParams): Promise<Group>;
}
