import { IImageStorage } from './../../image-storage/image-storage';
import { generateUUIDV4 } from './../../utils/helpers';
import { Services } from './../../utils/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './../../utils/typeorm/entities/Profile';
import { User } from './../../utils/typeorm/entities/User';
import { Inject, Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';
import { UpdateUserProfileParams } from 'src/utils/types';
import { IUserProfile } from '../interfaces/user-profile';

@Injectable()
export class UserProfileService implements IUserProfile {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(Services.IMAGE_UPLOAD_SERVICE)
    private readonly imageStorageService: IImageStorage,
  ) {}

  createProfile() {
    const newProfile = this.profileRepository.create();
    return this.profileRepository.save(newProfile);
  }

  async createProfileOrUpdate(user: User, params: UpdateUserProfileParams) {
    if (!user.profile) {
      user.profile = await this.createProfile();
      return this.updateProfile(user, params);
    }
    return this.updateProfile(user, params);
  }

  async updateProfile(user: User, params: UpdateUserProfileParams) {
    if (params.avatar)
      user.profile.avatar = await this.updateAvatar(params.avatar);
    if (params.banner)
      user.profile.banner = await this.updateBanner(params.banner);
    if (params.about) user.profile.about = params.about;
    return this.userRepository.save(user);
  }

  async updateBanner(file: Express.Multer.File) {
    const key = generateUUIDV4();
    await this.imageStorageService.uploadBanner({ key, file });
    return key;
  }

  async updateAvatar(file: Express.Multer.File) {
    const key = generateUUIDV4();
    await this.imageStorageService.uploadBanner({ key, file });
    return key;
  }
}