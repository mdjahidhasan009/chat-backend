import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupMessagesService } from './group-messages.service';
import { GroupMessage } from '../utils/typeorm';
import { Services } from '../utils/constants';
import { GroupMessageController } from './group-message.controller';
import { GroupModule } from '../groups/group.module';

@Module({
  imports: [TypeOrmModule.forFeature([GroupMessage]), GroupModule],
  controllers: [GroupMessageController],
  providers: [
    {
      provide: Services.GROUP_MESSAGES,
      useClass: GroupMessagesService,
    },
  ],
})
export class GroupMessageModule {}
