import { UserProfileFiles } from './../../utils/types';
import { IUserProfile } from '../interfaces/user-profile';
import { UpdateUserProfileDto } from '../dtos/UpdateUserProfile.dto';
import { User } from '../../utils/typeorm';
export declare class UserProfilesController {
    private readonly userProfileService;
    constructor(userProfileService: IUserProfile);
    updateUserProfile(user: User, files: UserProfileFiles, updateUserProfileDto: UpdateUserProfileDto): Promise<any>;
}
