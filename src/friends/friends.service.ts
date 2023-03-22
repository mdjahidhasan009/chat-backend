import { DeleteFriendException } from './exceptions/DeleteFriend';
import { FriendRequestNotFoundException } from './../friend-request/exceptions/FriendRequestNotFound';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteFriendRequestParams } from "src/utils/types";
import { Repository } from "typeorm";
import { Friend } from "../utils/typeorm";
import { IFriendsService } from "./friends";

@Injectable()
export class FriendsService implements IFriendsService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendsRepository: Repository<Friend>,
  ) {}

  getFriends(id: number): Promise<Friend[]> {
    return this.friendsRepository.find({
      where: [{ sender: { id } }, { receiver: { id } }],
      relations: ['sender', 'receiver'],
    });
  }

  findFriendById(id: number): Promise<Friend> {
    return this.friendsRepository.findOne(id, {
      relations: ['sender', 'receiver'],
    });
  }

  async deleteFriend({ id, userId }: DeleteFriendRequestParams) {
    const friend = await this.findFriendById(id);
    if (!friend) throw new FriendRequestNotFoundException();

    if (friend.receiver.id !== userId && friend.sender.id !== userId) throw new DeleteFriendException();

    return this.friendsRepository.delete(id);
  }
}