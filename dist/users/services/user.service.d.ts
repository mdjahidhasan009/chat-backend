import { Repository } from 'typeorm';
import { Peer, User } from '../../utils/typeorm';
import { CreateUserDetails, FindUserOptions, FindUserParams } from '../../utils/types';
import { IUserService } from '../interfaces/user';
export declare class UserService implements IUserService {
    private readonly userRepository;
    private readonly peerRepository;
    constructor(userRepository: Repository<User>, peerRepository: Repository<Peer>);
    createUser(userDetails: CreateUserDetails): Promise<User>;
    findUser(params: FindUserParams, options?: FindUserOptions): Promise<User>;
    saveUser(user: User): Promise<User>;
    searchUsers(query: string): Promise<User[]>;
}
