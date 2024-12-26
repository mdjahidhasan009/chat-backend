import { IImageStorageService } from './../../image-storage/image-storage';
import { Repository } from 'typeorm';
import { IUserService } from '../../users/interfaces/user';
import { Group, User } from '../../utils/typeorm';
import { AccessParams, CreateGroupParams, FetchGroupsParams, TransferOwnerParams, UpdateGroupDetailsParams } from '../../utils/types';
import { IGroupService } from '../interfaces/group';
export declare class GroupService implements IGroupService {
    private readonly groupRepository;
    private readonly userService;
    private readonly imageStorageService;
    constructor(groupRepository: Repository<Group>, userService: IUserService, imageStorageService: IImageStorageService);
    createGroup(params: CreateGroupParams): Promise<Group>;
    getGroups(params: FetchGroupsParams): Promise<Group[]>;
    findGroupById(id: number): Promise<Group>;
    saveGroup(group: Group): Promise<Group>;
    hasAccess({ id, userId }: AccessParams): Promise<User | undefined>;
    transferGroupOwner({ userId, groupId, newOwnerId, }: TransferOwnerParams): Promise<Group>;
    updateDetails(params: UpdateGroupDetailsParams): Promise<Group>;
}
