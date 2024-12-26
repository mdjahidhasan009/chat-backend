import { UpdateUserProfileParams } from '../../utils/types';
import { User } from '../../utils/typeorm';
export interface IUserProfile {
    createProfile(): any;
    updateProfile(user: User, params: UpdateUserProfileParams): any;
    createProfileOrUpdate(user: User, params: UpdateUserProfileParams): any;
}
