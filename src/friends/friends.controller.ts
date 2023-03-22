import { ParseIntPipe } from '@nestjs/common';
import { Delete, Param } from '@nestjs/common';
import { Controller, Get, Inject } from '@nestjs/common';
import { AuthUser } from '../utils/decorators';
import { Routes, Services } from '../utils/constants';
import { IFriendsService } from './friends';
import { User } from '../utils/typeorm';

@Controller(Routes.FRIENDS)
export class FriendsController {
  constructor(
    @Inject(Services.FRIENDS_SERVICE)
    private readonly friendsService: IFriendsService,
  ) {}

  @Get()
  getFriends(@AuthUser() user: User) {
    return this.friendsService.getFriends(user.id);
  }

  @Delete(':id/delete')
  deleteFriend(
    @AuthUser() { id: userId }: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.friendsService.deleteFriend({ id, userId });
  }
}