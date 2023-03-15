import { Module } from '@nestjs/common';
import { Services } from '../utils/constants';
import { GroupService } from './services/group.service';
import { GroupController } from './controllers/group.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group, GroupMessage } from '../utils/typeorm';
import { GroupMessageController } from './controllers/group-message.controller';
import { GroupMessageService } from './services/group-message.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Group, GroupMessage])],
  controllers: [GroupController, GroupMessageController],
  providers: [
    {
      provide: Services.GROUPS,
      useClass: GroupService,
    },
    {
      provide: Services.GROUP_MESSAGES,
      useClass: GroupMessageService,
    },
  ],
  exports: [
    {
      provide: Services.GROUPS,
      useClass: GroupService,
    },
  ],
})
export class GroupModule {}
