import * as bcrypt from 'bcrypt';
import { AuthenticatedRequest } from './types';
import { HttpException, HttpStatus } from '@nestjs/common';
import { NextFunction } from 'express';

export async function hashPassword(rawPassword: string) {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(rawPassword, salt);
}

export async function compareHash(rawPassword: string, hashedPassword: string) {
  return bcrypt.compare(rawPassword, hashedPassword);
}

export function isAuthorized(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  if (req.user) next();
  else throw new HttpException('Forbidden', HttpStatus.UNAUTHORIZED);
}
