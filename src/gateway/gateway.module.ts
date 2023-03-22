import { Module } from '@nestjs/common';
import { ConversationsModule } from '../conversations/conversations.module';
import { Services } from '../utils/constants';
import { MessagingGateway } from './gateway';
import { GatewaySessionManager } from './gateway.session';
import { GroupModule } from '../groups/group.module';

@Module({
  imports: [ConversationsModule, GroupModule],
  providers: [
    MessagingGateway,
    {
      provide: Services.GATEWAY_SESSION_MANAGER,
      useClass: GatewaySessionManager,
    },
  ],
  exports: [
    MessagingGateway,
    {
      provide: Services.GATEWAY_SESSION_MANAGER,
      useClass: GatewaySessionManager,
    },
  ],
})
export class GatewayModule {}