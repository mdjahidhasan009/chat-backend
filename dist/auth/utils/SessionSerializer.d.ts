import { PassportSerializer } from '@nestjs/passport';
import { IUserService } from '../../users/interfaces/user';
import { User } from '../../utils/typeorm';
export declare class SessionSerializer extends PassportSerializer {
    private readonly userService;
    constructor(userService: IUserService);
    serializeUser(user: User, done: Function): void;
    deserializeUser(user: User, done: Function): Promise<any>;
}
