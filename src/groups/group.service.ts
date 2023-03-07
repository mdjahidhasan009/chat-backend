import { Inject, Injectable } from '@nestjs/common';
import { IGroupService } from './group';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from '../utils/typeorm';
import { Repository } from 'typeorm';
import { Services } from '../utils/constants';
import { IUserService } from '../users/user';
import { CreateGroupParams } from '../utils/types';

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
    const usersPromise = params.users.map((email) =>
      this.userService.findUser({ email }),
    );
    const users = (await Promise.all(usersPromise)).filter((user) => user);
    users.push(creator);
    const group = this.groupRepository.create({ users, creator, title });
    return this.groupRepository.save(group);
  }
}
