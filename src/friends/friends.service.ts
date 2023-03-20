import { UserNotFoundException } from './../users/exceptions/UserNotFound';
import { UserService } from './../users/user.service';
import { FriendRequestPending } from './exceptions/FriendRequestPending';
import { IFriendsService } from './friends';
import { Injectable, Inject } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Friend } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { Services } from 'src/utils/constants';
import { IUserService } from 'src/users/user';
import { CreateFriendParams } from 'src/utils/types';

@Injectable()
export class FriendsService implements IFriendsService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
    @Inject(Services.USERS)
    private readonly UserService: IUserService,
  ) {}

  async createFriendRequest({ user: sender, email }: CreateFriendParams) {
    const recevier = await this.UserService.findUser({ email });
    if (!recevier) throw new UserNotFoundException();
    const exits = await this.isFriendRequestPending(sender.id, recevier.id);
    if (exits) throw new FriendRequestPending();
    const friend = this.friendRepository.create({
      sender,
      recevier,
      status: 'pending'
    });
    return this.friendRepository.save(friend);
  }

  isFriendRequestPending(userOneId: number, userTwoId: number) {
    return this.friendRepository.findOne({
      where: [
        {
          sender: { id: userOneId },
          recevier: { id: userTwoId },
          status: 'pending'
        },
        {
          sender: { id: userTwoId },
          receiver: { id: userOneId },
          status: 'pending'
        },
      ],
    });
  }

  isFriends(userOneId: number, userTwoId: number) {
    return this.friendRepository.findOne({
      where: [
        {
          sender: { id: userOneId },
          recevier: { id: userTwoId },
          status: 'accepted',
        },
        {
          sender: { id: userTwoId },
          recevier: { id: userTwoId },
          status: 'accepted',
        },
      ],
    });
  }
}