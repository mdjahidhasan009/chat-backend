import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashPassword } from '../utils/helpers';
import { User } from '../utils/typeorm';
import {CreateUserDetails, FindUserOptions, FindUserParams} from '../utils/types';
import { IUserService } from './user';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userDetails: CreateUserDetails) {
    const existingUser = await this.userRepository.findOne({
      email: userDetails.email,
    });
    if (existingUser)
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    const password = await hashPassword(userDetails.password);
    const newUser = this.userRepository.create({ ...userDetails, password });
    return this.userRepository.save(newUser);
  }

  async findUser(
    params: FindUserParams,
    options?: FindUserOptions,
  ): Promise<User> {
    const selections: (keyof User)[] = ['email', 'firstName', 'lastName', 'id'];
    const selectionsWithPassword: (keyof User)[] = [...selections, 'password'];
    return this.userRepository.findOne(params, {
      select: options?.selectAll ? selectionsWithPassword : selections,
    });
  }

  async saveUser(user: User) {
    return this.userRepository.save(user);
  }

  async searchUsers(query: string) {
    const statement = '(user.email LIKE :query)';
    return this.userRepository
      .createQueryBuilder('user')
      .where(statement, { query: `%${query}%` })
      .limit(10)
      .select(['user.firstName', 'user.lastName', 'user.email', 'user.id'])
      .getMany();
  }
}