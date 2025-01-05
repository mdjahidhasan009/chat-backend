import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IUserService } from '../users/interfaces/user';
import { Services } from '../utils/constants';
import { compareHash } from '../utils/helpers';
import { ValidateUserDetails } from '../utils/types';
import { IAuthService } from './auth';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService,
  ) {}

  /**
   * Validates user credentials by checking username and password.
   * @param userDetails The username and password to validate.
   * @returns The user object if validation succeeds.
   * @throws HttpException with a 401 status code if validation fails.
   */
  async validateUser(userDetails: ValidateUserDetails) {
    const user = await this.getUserByUsername(userDetails.username);
    await this.validatePassword(userDetails.password, user.password);
    return user;
  }

  /**
   * Retrieves a user by their username.
   * @param username The username to search for.
   * @returns The user object if found.
   * @throws HttpException if the user is not found.
   */
  private async getUserByUsername(username: string) {
    const user = await this.userService.findUser(
      { username },
      { selectAll: true },
    );
    if (!user) {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }

  /**
   * Validates a password against a stored hashed password.
   * @param plainPassword The plain-text password provided by the user.
   * @param hashedPassword The hashed password stored in the database.
   * @throws HttpException if the password does not match.
   */
  private async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordValid = await compareHash(plainPassword, hashedPassword);
    if (!isPasswordValid) {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
