import { Module } from '@nestjs/common';
import { Services } from '../utils/constants';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from '../utils/typeorm';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Group])],
  controllers: [GroupController],
  providers: [
    {
      provide: Services.GROUPS,
      useClass: GroupService,
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
