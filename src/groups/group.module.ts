import { Module } from '@nestjs/common';
import { Services } from '../utils/constants';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';

@Module({
  imports: [],
  controllers: [GroupController],
  providers: [
    {
      provide: Services.GROUPS,
      useClass: GroupService,
    },
  ],
})

export class GroupModule {}