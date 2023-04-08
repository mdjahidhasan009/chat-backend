import { UpdateUserProfileParams } from '../../utils/types';
import { User } from '../../utils/typeorm';

export interface IUserProfile {
  createProfile();
  updateProfile(user: User, params: UpdateUserProfileParams);
}