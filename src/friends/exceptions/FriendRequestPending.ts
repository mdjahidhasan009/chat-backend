import { HttpException, HttpStatus } from '@nestjs/common';

export class FriendRequestPending extends HttpException {
  constructor() {
    super('Friend request pending', HttpStatus.BAD_REQUEST);
  }
}