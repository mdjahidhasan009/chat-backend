import { Services } from './../utils/constants';
import { Body, Controller, Get, Inject, Param, ParseIntPipe, Patch, Post, Delete } from "@nestjs/common";
import { Routes } from "src/utils/constants";
import { IFriendRequestService } from './friend-requests';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';
import { CreateFriendDto } from 'src/friends/dto/CreateFriend.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller(Routes.FRIEND_REQUESTS)
export class FriendRequestController {
  constructor(
    @Inject(Services.FRIENDS_REQUESTS_SERVICE)
    private readonly friendRequestService: IFriendRequestService,
    private event: EventEmitter2,
  ) {}

  @Get()
  getFriendRequests(@AuthUser() user: User) {
    return this.friendRequestService.getFriendRequests(user.id);
  }

  @Post()
  async createFriendRequest(
    @AuthUser() user: User,
    @Body() { email }: CreateFriendDto
  ) {
    const params = { user, email };
    const friendRequest = await this.friendRequestService.create(params);
    this.event.emit('friendrequest.create', friendRequest);
    return friendRequest;
  }

  @Patch(':id/accept')
  acceptFriendRequest(
    @AuthUser() { id: userId }: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.friendRequestService.accept({ id, userId });
  }

  @Delete(':id/cancel')
  cancelFriendRequest(
    @AuthUser() { id: userId }: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.friendRequestService.cancel({ id, userId });
  }

  @Patch(':id/refect')
  rejectFriendRequest(
    @AuthUser() { id: userId }: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.friendRequestService.reject({ id, userId });
  }
}