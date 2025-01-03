import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConversationsModule } from './conversations/conversations.module';
import { MessagesModule } from './messages/messages.module';
import { GatewayModule } from './gateway/gateway.module';
import entities from './utils/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GroupModule } from './groups/group.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { FriendRequestsModule } from './friend-request/friend-requests.module';
import { EventsModule } from './events/events.module';
import { ExistsModule } from './exists/exists.module';
import { MessageAttachmentsModule } from './message-attachments/message-attachments.module';
import { ThrottlerBehindProxyGuard } from './utils/throttler';
import { FriendsModule } from './friends/friends.module';

let envFilePath = '.env.development';
if (process.env.ENVIRONMENT === 'PRODUCTION') envFilePath = '.env.production';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConversationsModule,
    ConfigModule.forRoot({ envFilePath }),
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
      logging: false,
    }),
    MessagesModule,
    GatewayModule,
    GroupModule,
    EventsModule,
    FriendRequestsModule,
    FriendsModule,
    ExistsModule,
    MessageAttachmentsModule,
    EventEmitterModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: 10,
      limit: 10,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      // useClass: ThrottlerGuard,
      useClass: ThrottlerBehindProxyGuard,
    },
  ],
})
export class AppModule {}
