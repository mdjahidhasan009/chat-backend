import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Services } from '../../utils/constants';
import { IAuthService } from '../auth';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(Services.AUTH) private readonly authService: IAuthService,
  ) {
    // super({ usernameField: 'email' });
    super();
  }

  async validate(username: string, password: string) {
    console.log(
      'inside src/auth/utils/LocalStrategy and Validating user:',
      username,
      password,
    );
    return this.authService.validateUser({ username, password });
  }
}
