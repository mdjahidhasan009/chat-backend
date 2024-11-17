import { DeleteFriendException } from './exceptions/DeleteFriend';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteFriendRequestParams } from "src/utils/types";
import { Repository } from "typeorm";
import { Friend } from "../utils/typeorm";
import { IFriendsService } from "./friends";
import { FriendNotFoundException } from "./exceptions/FriendNotFound";

@Injectable()
export class FriendsService implements IFriendsService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendsRepository: Repository<Friend>,
  ) {}

  getFriends(id: number): Promise<Friend[]> {
    return this.friendsRepository.find({
      where: [{ sender: { id } }, { receiver: { id } }],
      relations: [
        'sender',
        'receiver',
        'sender.profile',
        'receiver.profile',
        'receiver.presence',
        'sender.presence',
      ],
    });
  }

  findFriendById(id: number): Promise<Friend> {
    return this.friendsRepository.findOne(id, {
      relations: [
        'sender',
        'receiver',
        'sender.profile',
        'sender.presence',
        'receiver.profile',
        'receiver.presence',
      ],
    });
  }

  async deleteFriend({ id, userId }: DeleteFriendRequestParams) {
    const friend = await this.findFriendById(id);
    if (!friend) throw new FriendNotFoundException();

    if (friend.receiver.id !== userId && friend.sender.id !== userId) throw new DeleteFriendException();

    await this.friendsRepository.delete(id);
    return friend;
  }

  isFriends(userOneId: number, userTwoId: number) {
    return this.friendsRepository.findOne({
      where: [
        {
          sender: { id: userOneId },
          receiver: { id: userTwoId },
        },
        {
          sender: { id: userTwoId },
          receiver: { id: userOneId },
        },
      ],
    });
  }
}