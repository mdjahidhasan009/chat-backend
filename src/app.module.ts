import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import entities from './utils/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationsModule } from './conversations/conversations.module';
import { ParticipantsModule } from './participants/participants.module';
import * as process from 'process';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({ envFilePath: '.env.development' }),
    PassportModule.register({ session: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_DB_HOST,
      port: parseInt(process.env.MYSQL_DB_PORT),
      username: process.env.MYSQL_DB_USERNAME,
      password: process.env.MYSQL_DB_PASSWORD,
      database: process.env.MYSQL_DB_NAME,
      synchronize: true,
      entities,
      logging: true,
    }),
    ConversationsModule,
    ParticipantsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
