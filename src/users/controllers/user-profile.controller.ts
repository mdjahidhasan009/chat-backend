import { UpdateUserProfileParams, UserProfileFiles } from './../../utils/types';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { IUserProfile } from '../interfaces/user-profile';
import { Routes, Services, UserProfileFileFields } from './../../utils/constants';
import { Body, Controller, Inject, Patch, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { UpdateUserProfileDto } from '../dtos/UpdateUserProfile.dto';
import { AuthUser } from '../../utils/decorators';
import { User } from '../../utils/typeorm';

@Controller(Routes.USERS_PROFILES)
export class UserProfilesController {
  constructor(
    @Inject(Services.USERS_PROFILES)
    private readonly userProfileService: IUserProfile,
  ) {}

  @Patch()
  @UseInterceptors(FileFieldsInterceptor(UserProfileFileFields))
  async updateUserProfile(
    @AuthUser() user: User,
    @UploadedFiles() files: UserProfileFiles,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ) {
    const params: UpdateUserProfileParams = {};
    updateUserProfileDto.about && (params.about = updateUserProfileDto.about);
    files.banner && (params.banner = files.banner[0]);
    files.avatar && (params.avatar = files.avatar[0]);
    return await this.userProfileService.updateProfile(user, params);
  } 
}