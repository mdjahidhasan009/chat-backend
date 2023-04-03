import { Module } from '@nestjs/common';
import { GatewayModule } from '../gateway/gateway.module';
import { FriendRequestsEvents } from './friend-requests.events';
import { FriendEvents } from './friend.events';

@Module({
  imports: [GatewayModule],
  providers: [FriendRequestsEvents, FriendEvents],
})

export class EventsModule {}