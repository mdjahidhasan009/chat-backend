import { DeleteFriendRequestParams } from "src/utils/types";
import { Repository } from "typeorm";
import { Friend } from "../utils/typeorm";
import { IFriendsService } from "./friends";
export declare class FriendsService implements IFriendsService {
    private readonly friendsRepository;
    constructor(friendsRepository: Repository<Friend>);
    getFriends(id: number): Promise<Friend[]>;
    findFriendById(id: number): Promise<Friend>;
    deleteFriend({ id, userId }: DeleteFriendRequestParams): Promise<Friend>;
    isFriends(userOneId: number, userTwoId: number): Promise<Friend>;
}
