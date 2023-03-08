import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IGroupMessagesService } from './group-messages';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupMessage, Message } from '../utils/typeorm';
import { Repository } from 'typeorm';
import { CreateGroupMessageParams } from '../utils/types';
import { Services } from '../utils/constants';
import { IGroupService } from '../groups/group';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class GroupMessagesService implements IGroupMessagesService {
  constructor(
    @InjectRepository(GroupMessage)
    private readonly groupMessageRepository: Repository<GroupMessage>,
    @Inject(Services.GROUPS)
    private readonly groupService: IGroupService,
  ) {}

  async createGroupMessage({
    groupId: id,
    ...params
  }: CreateGroupMessageParams) {
    const { content, author } = params;
    const group = await this.groupService.findGroupById(id);
    if (!group) {
      throw new HttpException('No Group Found', HttpStatus.BAD_REQUEST);
    }
    const findUser = group.users.find((user) => user.id === author.id);
    if (!findUser) {
      throw new HttpException('User not in group', HttpStatus.BAD_REQUEST);
    }
    const groupMessage = this.groupMessageRepository.create({
      content,
      group,
      author: instanceToPlain(author),
    });
    const savedMessage = await this.groupMessageRepository.save(groupMessage);
    group.lastMessageSent = savedMessage;
    const updatedGroup = await this.groupService.saveGroup(group);
    return { message: savedMessage, group: updatedGroup };
  }
}
