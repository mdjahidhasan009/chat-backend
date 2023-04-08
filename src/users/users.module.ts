import { ImageStorageModule } from './../image-storage/image-storage.module';
import { Module } from '@nestjs/common';
import { Services } from '../utils/constants';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile, User } from '../utils/typeorm';
import { UsersController } from './controllers/user.controller';
import { UserProfileService } from './services/user-profile.service';
import { UserProfilesController } from './controllers/user-profile.controller';

@Module({
  // providers: [UserService],
  imports: [TypeOrmModule.forFeature([User, Profile]), ImageStorageModule],
  controllers: [UsersController, UserProfilesController],
  providers: [
    {
      provide: Services.USERS,
      useClass: UserService,
    },
    {
      provide: Services.USERS_PROFILES,
      useClass: UserProfileService,
    },
  ],
  exports: [
    {
      provide: Services.USERS,
      useClass: UserService,
    },
    {
      provide: Services.USERS_PROFILES,
      useClass: UserProfileService,
    },
  ],
})
export class UsersModule {}
