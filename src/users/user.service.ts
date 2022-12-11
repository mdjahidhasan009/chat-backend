import { Injectable } from '@nestjs/common';
import { IUserService } from './user';
import { CreateUserDetails } from "../utils/types";

@Injectable()
export class UserService implements IUserService {
  createUser(userDetails: CreateUserDetails) {
    console.log('UserService.createUser');
  }
}