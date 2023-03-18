import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidGroupException extends HttpException {
  constructor() {
    super('Invalid group', HttpStatus.BAD_REQUEST);
  }
}
