import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import session from 'express-session';
import passport from 'passport';
import { TypeormStore } from 'connect-typeorm';
import { Session } from './utils/typeorm';
import { getRepository } from 'typeorm';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WebsocketAdapter } from './gateway/getway.adapter';

async function bootstrap() {
  const { PORT, COOKIE_SECRET } = process.env;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const sessionRepository = getRepository(Session);
  const adapter = new WebsocketAdapter(app);
  app.useWebSocketAdapter(adapter);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: [
      'http://localhost:3000', // Local development
      `${process.env.FRONTEND_URL}`, // Deployed frontend
    ],
    credentials: true, // Allow cookies to be sent
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });
  app.useGlobalPipes(new ValidationPipe());
  app.set('trust proxy', 'loopback');

  app.use(
    session({
      secret: COOKIE_SECRET,
      saveUninitialized: false,
      resave: false,
      name: 'CHAT_APP_SESSION_ID',
      cookie: {
        maxAge: 86400000, // 1 day
        httpOnly: true, // Prevent client-side JavaScript access
        secure: process.env.NODE_ENV === 'production', // Send only over HTTPS in production
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Required for cross-origin cookies
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  try {
    await app.listen(PORT, () => {
      console.log(`Running on Port ${PORT}`);
      console.log(
        `Running in ${process.env.ENVIRONMENT} mode: ${process.env.ENVIRONMENT_MESSAGE}`,
      );
    });
  } catch (err) {
    console.error(err);
  }
}
bootstrap();
////TODO: Have to upgrade to datasource, getRepository means latest version, will upgrade typeorm later
