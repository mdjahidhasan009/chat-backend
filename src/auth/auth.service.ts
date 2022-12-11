import { Inject, Injectable } from '@nestjs/common';
import { Services } from '../utils/constants';
import { IAuthService } from './auth';
import { IUserService } from '../users/user';

@Injectable()
export class AuthService implements IAuthService {
  constructor(@Inject(Services.USERS) private userService: IUserService) {}
  validateUser() {}
}
