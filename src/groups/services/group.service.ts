import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserNotFoundException } from '../../users/exceptions/UserNotFound';
import { IUserService } from '../../users/interfaces/user';
import { Services } from '../../utils/constants';
import { Group, User } from '../../utils/typeorm';
import {
  AccessParams,
  CheckUserGroupParams,
  CreateGroupParams,
  FetchGroupsParams,
  TransferOwnerParams,
} from '../../utils/types';
import { GroupNotFoundException } from '../exceptions/GroupNotFound';
import { GroupOwnerTransferException } from '../exceptions/GroupOwnerTransfer';
import { IGroupService } from '../interfaces/group';

@Injectable()
export class GroupService implements IGroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @Inject(Services.USERS)
    private readonly userService: IUserService,
  ) {}

  async createGroup(params: CreateGroupParams) {
    const { creator, title } = params;
    const usersPromise = params.users.map((username) =>
      this.userService.findUser({ username }),
    );
    const users = (await Promise.all(usersPromise)).filter((user) => user);
    users.push(creator);
    const groupParams = { owner: creator, users, creator, title };
    const group = this.groupRepository.create(groupParams);
    return this.groupRepository.save(group);
  }

  getGroups(params: FetchGroupsParams): Promise<Group[]> {
    return this.groupRepository
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.users', 'user')
      .where('user.id IN (:users)', { users: [params.userId] })
      .leftJoinAndSelect('group.users', 'users')
      .leftJoinAndSelect('group.creator', 'creator')
      .leftJoinAndSelect('group.owner', 'owner')
      .leftJoinAndSelect('users.profile', 'usersProfile')
      .leftJoinAndSelect('users.presence', 'usersPresence')
      .getMany();
  }

  findGroupById(id: number): Promise<Group> {
    return this.groupRepository.findOne({
      where: { id },
      relations: [
        'creator',
        'users',
        'lastMessageSent',
        'owner',
        'users.profile',
        'users.presence',
      ],
    });
  }

  saveGroup(group: Group): Promise<Group> {
    return this.groupRepository.save(group);
  }

  async hasAccess({ id, userId }: AccessParams): Promise<User | undefined> {
    const group = await this.findGroupById(id);
    if (!group) throw new GroupNotFoundException();
    return group.users.find((user) => user.id === userId);
  }

  async transferGroupOwner({
    userId,
    groupId,
    newOwnerId,
  }: TransferOwnerParams): Promise<Group> {
    const group = await this.findGroupById(groupId);
    if (!group) throw new GroupNotFoundException();
    if (group.owner.id !== userId)
      throw new GroupOwnerTransferException('Insufficient Permissions');
    if (group.owner.id === newOwnerId)
      throw new GroupOwnerTransferException(
        'Cannot Transfer Owner to yourself',
      );
    const newOwner = await this.userService.findUser({ id: newOwnerId });
    if (!newOwner) throw new UserNotFoundException();
    group.owner = newOwner;
    return this.groupRepository.save(group);
  }
}