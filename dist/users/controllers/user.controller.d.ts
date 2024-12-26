import { HttpStatus } from '@nestjs/common';
import { IUserService } from '../interfaces/user';
export declare class UsersController {
    private readonly userService;
    constructor(userService: IUserService);
    searchUsers(query: string): Promise<import("../../utils/typeorm").User[]>;
    checkUsername(username: string): Promise<HttpStatus>;
}
