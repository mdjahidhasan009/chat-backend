import { MessageAttachmentsModule } from './../message-attachments/message-attachments.module';
import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { Services } from '../utils/constants';
import { GroupService } from './services/group.service';
import { GroupController } from './controllers/group.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group, GroupMessage } from '../utils/typeorm';
import { GroupMessageController } from './controllers/group-message.controller';
import { ImageStorageModule } from '../image-storage/image-storage.module';
import { GroupMessageService } from './services/group-message.service';
import { GroupRecipientsController } from './controllers/group-recipients.controller';
import { GroupRecipientService } from './services/group-recipient.service';
import {isAuthorized} from "../utils/helpers";
import {GroupMiddleware} from "./middlewares/group.middleware";

@Module({
  imports: [
    UsersModule,
    MessageAttachmentsModule,
    ImageStorageModule,
    TypeOrmModule.forFeature([Group, GroupMessage]),
  ],
  controllers: [
    GroupController,
    GroupMessageController,
    GroupRecipientsController,
  ],
  providers: [
    {
      provide: Services.GROUPS,
      useClass: GroupService,
    },
    {
      provide: Services.GROUP_MESSAGES,
      useClass: GroupMessageService,
    },
    {
      provide: Services.GROUP_RECIPIENTS,
      useClass: GroupRecipientService,
    },
  ],
  exports: [
    {
      provide: Services.GROUPS,
      useClass: GroupService,
    },
  ],
})
export class GroupModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(isAuthorized, GroupMiddleware).forRoutes('groups/:id');
  }
}
