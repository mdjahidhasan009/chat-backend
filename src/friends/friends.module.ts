import { Friend } from './../utils/typeorm/entities/Friend';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { FriendsController } from './friends.controller';
import { Services } from 'src/utils/constants';
import { FriendsService } from './friends.service';

@Module({
  imports: [TypeOrmModule.forFeature([Friend]), UsersModule],
  controllers: [ FriendsController ],
  providers: [
    {
      provide: Services.FRIENDS_SERVICE,
      useClass: FriendsService,
    },
  ],
})

export class FriendsModule {}