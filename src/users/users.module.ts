import { ImageStorageModule } from './../image-storage/image-storage.module';
import { Module } from '@nestjs/common';
import { Services } from '../utils/constants';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile, User, UserPresence, Peer } from '../utils/typeorm';
import { UsersController } from './controllers/user.controller';
import { UserProfileService } from './services/user-profile.service';
import { UserProfilesController } from './controllers/user-profile.controller';
import { UserPresenceController } from './controllers/user-presence.controller';
import { UserPresenceService } from './services/user-presence.service';

@Module({
  // providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([User, UserPresence, Profile, Peer]), 
    ImageStorageModule
  ],
  controllers: [
    UsersController, 
    UserProfilesController,
    UserPresenceController
  ],
  providers: [
    {
      provide: Services.USERS,
      useClass: UserService,
    },
    {
      provide: Services.USERS_PROFILES,
      useClass: UserProfileService,
    },
    {
      provide: Services.USER_PRESENCE,
      useClass: UserPresenceService,
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
    {
      provide: Services.USER_PRESENCE,
      useClass: UserPresenceService,
    },
  ],
})
export class UsersModule {}
