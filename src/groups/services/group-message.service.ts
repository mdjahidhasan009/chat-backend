import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IGroupMessagesService } from '../interfaces/group-messages';
import { InjectRepository } from '@nestjs/typeorm';
import { Group, GroupMessage, Message } from '../../utils/typeorm';
import { Repository } from 'typeorm';
import {
  CreateGroupMessageParams,
  DeleteGroupMessageParams, EditGroupMessageParams,
} from '../../utils/types';
import { Services } from '../../utils/constants';
import { IGroupService } from '../interfaces/group';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class GroupMessageService implements IGroupMessagesService {
  constructor(
    @InjectRepository(GroupMessage)
    private readonly groupMessageRepository: Repository<GroupMessage>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
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

  getGroupMessages(id: number): Promise<GroupMessage[]> {
    return this.groupMessageRepository.find({
      where: { group: { id } },
      relations: ['author'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async deleteGroupMessage(params: DeleteGroupMessageParams) {
    const group = await this.groupRepository
      .createQueryBuilder('group')
      .where('group.id = :groupId', { groupId: params.groupId })
      .leftJoinAndSelect('group.lastMessageSent', 'lastMessageSent')
      .leftJoinAndSelect('group.messages', 'messages')
      .orderBy('message.createdAt', 'DESC')
      .limit(5)
      .getOne();

    if (!group)
      throw new HttpException('Group not found', HttpStatus.BAD_REQUEST);
    const message = await this.groupMessageRepository.findOne({
      id: params.messageId,
      author: { id: params.userId },
      group: { id: params.groupId },
    });
    if (!message)
      throw new HttpException('Cannot delete message', HttpStatus.BAD_REQUEST);

    if (group.lastMessageSent.id !== message.id)
      return this.groupMessageRepository.delete({ id: message.id });

    const size = group.messages.length;
    const SECOND_MESSAGE_INDEX = 1;
    if (size <= 1) {
      await this.groupRepository.update(
        { id: params.groupId },
        { lastMessageSent: null },
      );
      return this.groupMessageRepository.delete({ id: message.id });
    } else {
      const newLastMessage = group.messages[SECOND_MESSAGE_INDEX];
      await this.groupRepository.update(
        { id: params.groupId },
        { lastMessageSent: newLastMessage },
      );
      return this.groupMessageRepository.delete({ id: message.id });
    }
  }

  async editGroupMessage(params: EditGroupMessageParams) {
    const messageDB = await this.groupMessageRepository.findOne({
      where: {
        id: params.messageId,
        author: { id: params.userId },
      },
      relations: ['group', 'group.creator', 'group.users', 'author'],
    });
    if (!messageDB)
      throw new HttpException('Cannot Edit Message', HttpStatus.BAD_REQUEST);
    messageDB.content = params.content;
    return this.groupMessageRepository.save(messageDB);
  }
}
