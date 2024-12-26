import { Repository } from 'typeorm';
import { User, UserPresence } from '../../utils/typeorm';
import { UpdateStatusMessageParams } from '../../utils/types';
import { IUserService } from '../interfaces/user';
import { IUserPresenceService } from '../interfaces/user-presence';
export declare class UserPresenceService implements IUserPresenceService {
    private readonly userPresenceRepository;
    private readonly userService;
    constructor(userPresenceRepository: Repository<UserPresence>, userService: IUserService);
    createPresence(): Promise<UserPresence>;
    updateStatus({ user, statusMessage, }: UpdateStatusMessageParams): Promise<User>;
}
