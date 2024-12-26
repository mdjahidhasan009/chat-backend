import { HttpException } from '@nestjs/common';
export declare class FriendRequestException extends HttpException {
    constructor(msg?: string);
}
