import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupMessagesService } from './group-messages.service';
import { Message } from '../utils/typeorm';
import { Services } from '../utils/constants';
import { GroupMessageController } from './group-message.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  controllers: [GroupMessageController],
  providers: [
    {
      provide: Services.GROUP_MESSAGES,
      useClass: GroupMessagesService,
    },
  ],
})
export class GroupMessageModule {}
