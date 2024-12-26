import { IUserService } from '../users/interfaces/user';
import { ValidateUserDetails } from '../utils/types';
import { IAuthService } from './auth';
export declare class AuthService implements IAuthService {
    private readonly userService;
    constructor(userService: IUserService);
    validateUser(userDetails: ValidateUserDetails): Promise<import("../utils/typeorm").User>;
}
