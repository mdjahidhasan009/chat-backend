import { Routes, Services } from '../../utils/constants';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { IGroupService } from '../interfaces/group';
import { AuthUser } from '../../utils/decorators';
import { CreateGroupDto } from '../dtos/CreateGroup.dto';
import { User } from '../../utils/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller(Routes.GROUPS)
export class GroupController {
  constructor(
    @Inject(Services.GROUPS) private readonly groupService: IGroupService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Post()
  async createGroup(@AuthUser() user: User, @Body() payload: CreateGroupDto) {
    const group = this.groupService.createGroup({
      ...payload,
      creator: user,
    });
    this.eventEmitter.emit('group.create', group);
    return group;
  }

  @Get()
  getGroups(@AuthUser() user: User) {
    return this.groupService.getGroups({ userId: user.id });
  }

  @Get(':id')
  getGroup(@AuthUser() user: User, @Param('id') id: number) {
    return this.groupService.findGroupById(id);
  }
}
