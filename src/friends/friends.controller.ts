import { ServerEvents } from './../utils/constants';
import { ParseIntPipe } from '@nestjs/common';
import { Delete, Param } from '@nestjs/common';
import { Controller, Get, Inject } from '@nestjs/common';
import { AuthUser } from '../utils/decorators';
import { Routes, Services } from '../utils/constants';
import { IFriendsService } from './friends';
import { User } from '../utils/typeorm';
import { SkipThrottle } from '@nestjs/throttler';
import { EventEmitter2 } from '@nestjs/event-emitter';

@SkipThrottle()
@Controller(Routes.FRIENDS)
export class FriendsController {
  constructor(
    @Inject(Services.FRIENDS_SERVICE)
    private readonly friendsService: IFriendsService,
    private readonly event: EventEmitter2,
  ) {}

  @Get()
  getFriends(@AuthUser() user: User) {
    return this.friendsService.getFriends(user.id);
  }

  @Delete(':id/delete')
  async deleteFriend(
    @AuthUser() { id: userId }: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const friend = await this.friendsService.deleteFriend({ id, userId });
    this.event.emit(ServerEvents.FRIEND_REMOVED, { friend, userId });
    return friend;
  }
}