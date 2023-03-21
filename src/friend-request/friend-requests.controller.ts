import { Services } from './../utils/constants';
import { Body, Controller, Inject, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { Routes } from "src/utils/constants";
import { IFriendRequestService } from './friend-requests';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';
import { CreateFriendDto } from 'src/friends/dto/CreateFriend.dto';

@Controller(Routes.FRIEND_REQUESTS)
export class FriendRequestController {
  constructor(
    @Inject(Services.FRIENDS_REQUESTS_SERVICE)
    private readonly friendRequestService: IFriendRequestService,
  ) {}

  @Post()
  createFriendRequest(
    @AuthUser() user: User,
    @Body() { email }: CreateFriendDto
  ) {
    const params = { user, email };
    return this.friendRequestService.create(params);
  }

  @Patch(':id/accept')
  acceptFriendRequest(
    @AuthUser() { id: userId }: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.friendRequestService.accept({ id, userId });
  }
}