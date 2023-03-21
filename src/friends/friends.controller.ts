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
}