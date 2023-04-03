import { FriendsModule } from './../friends/friends.module';
import { FriendRequest } from './../utils/typeorm/entities/FriendRequest';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from '../utils/typeorm/entities/Friend';
import { UsersModule } from '../users/users.module';
import { FriendRequestController } from './friend-requests.controller';
import { Services } from '../utils/constants';
import { FriendRequestService } from './friend-requests.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Friend, FriendRequest ]), 
    UsersModule,
    FriendsModule
  ],
  controllers: [FriendRequestController],
  providers: [
    {
      provide: Services.FRIENDS_REQUESTS_SERVICE,
      useClass: FriendRequestService,
    },
  ],
})

export class FriendRequestsModule {}