import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { Routes, Services } from '../utils/constants';
import { AuthenticatedGuard } from '../auth/utils/Guards';
import { IConversationsService } from './conversations';
import { CreateConversationDto } from './dtos/CreateConversation.dto';
import { AuthUser } from '../utils/decorators';
import { User } from '../utils/typeorm';

@Controller(Routes.CONVERSATIONS)
@UseGuards(AuthenticatedGuard)
export class ConversationsController {
  constructor(
    @Inject(Services.CONVERSATIONS)
    private readonly conversationsService: IConversationsService,
  ) {}
  @Post()
  async createConversations(
    @AuthUser() user: User,
    @Body() createConversationPayload: CreateConversationDto,
  ) {
    return this.conversationsService.createConversation(
      user,
      createConversationPayload,
    );
  }
}
