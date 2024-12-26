/// <reference types="multer" />
import { IImageStorageService } from './../../image-storage/image-storage';
import { Profile } from './../../utils/typeorm/entities/Profile';
import { User } from './../../utils/typeorm/entities/User';
import { Repository } from 'typeorm';
import { UpdateUserProfileParams } from 'src/utils/types';
import { IUserProfile } from '../interfaces/user-profile';
export declare class UserProfileService implements IUserProfile {
    private readonly profileRepository;
    private readonly userRepository;
    private readonly imageStorageService;
    constructor(profileRepository: Repository<Profile>, userRepository: Repository<User>, imageStorageService: IImageStorageService);
    createProfile(): Promise<Profile>;
    createProfileOrUpdate(user: User, params: UpdateUserProfileParams): Promise<User>;
    updateProfile(user: User, params: UpdateUserProfileParams): Promise<User>;
    updateBanner(file: Express.Multer.File): Promise<string>;
    updateAvatar(file: Express.Multer.File): Promise<string>;
}
