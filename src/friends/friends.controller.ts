import { IFriendsService } from './friends';
import { Controller, Inject, Post, Body } from "@nestjs/common";
import { Routes } from "src/utils/constants";
import { Services } from "src/utils/constants";
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';
import { CreateFriendDto } from './dto/CreateFriend.dto';

@Controller(Routes.FRIENDS)
export class FriendsController {
  constructor(
    @Inject(Services.FRIENDS_SERVICE)
    private readonly friendsService: IFriendsService,
  ) {}

  @Post()
  createFriend(@AuthUser() user: User, @Body() { email }: CreateFriendDto) {
    const params = { user, email };
    return this.friendsService.createFriendRequest(params);
  }
}
