import { EmptyMessageException } from './../../messages/exceptions/EmptyMessage';
import { Attachment } from './../../utils/types';
import {
  Body,
  Controller, Delete, Get,
  Inject,
  Param,
  ParseIntPipe, Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Routes, Services } from '../../utils/constants';
import { IGroupMessagesService } from '../interfaces/group-messages';
import { AuthUser } from '../../utils/decorators';
import { User } from '../../utils/typeorm';
import { CreateMessageDto } from '../../messages/dtos/CreateMessage.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {EditMessageDto} from "../../messages/dtos/EditMessage.dto";
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller(Routes.GROUP_MESSAGES)
export class GroupMessageController {
  constructor(
    @Inject(Services.GROUP_MESSAGES)
    private readonly groupMessageService: IGroupMessagesService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Throttle(5, 10)
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'attachments',
        maxCount: 5,
      },
    ]),
  )
  @Post()
  async createGroupMessage(
    @AuthUser() user: User,
    @UploadedFiles() { attachments }: { attachments: Attachment[] },
    @Param('id', ParseIntPipe) id: number,
    @Body() { content }: CreateMessageDto,
  ) {
    if (!attachments && !content) throw new EmptyMessageException();
    const params = { groupId: id, author: user, content, attachments };
    const response = await this.groupMessageService.createGroupMessage(params);
    this.eventEmitter.emit('group.message.create', response);
    return;
  }

  @Get()
  @SkipThrottle()
  async getGroupMessages(
    @AuthUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const messages = await this.groupMessageService.getGroupMessages(id);
    return { id, messages };
  }

  @Delete(':messageId')
  @SkipThrottle()
  async deleteGroupMessage(
    @AuthUser() user: User,
    @Param('id', ParseIntPipe) groupId: number,
    @Param('messageId', ParseIntPipe) messageId: number,
  ) {
    await this.groupMessageService.deleteGroupMessage({
      userId: user.id,
      groupId,
      messageId,
    });
    this.eventEmitter.emit('group.message.delete', {
      userId: user.id,
      messageId,
      groupId,
    });
    return { groupId, messageId };
  }

  @Patch(':messageId')
  @SkipThrottle()
  async editGroupMessage(
    @AuthUser() { id: userId }: User,
    @Param('id', ParseIntPipe) groupId: number,
    @Param('messageId', ParseIntPipe) messageId: number,
    @Body() { content }: EditMessageDto,
  ) {
    const params = { userId, content, groupId, messageId };
    const message = await this.groupMessageService.editGroupMessage(params);
    this.eventEmitter.emit('group.message.update', message);
    return message;
  }
}
