import { User } from '../../utils/typeorm';
import { UpdatePresenceStatusDto } from '../dtos/UpdatePresenceStatus.dto';
import { IUserPresenceService } from '../interfaces/user-presence';
export declare class UserPresenceController {
    private readonly userPresenceService;
    constructor(userPresenceService: IUserPresenceService);
    updateStatus(user: User, { statusMessage }: UpdatePresenceStatusDto): Promise<User>;
}
