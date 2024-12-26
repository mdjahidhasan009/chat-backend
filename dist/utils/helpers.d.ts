/// <reference types="node" />
import { Attachment, AuthenticatedRequest } from './types';
import { NextFunction } from 'express';
export declare function hashPassword(rawPassword: string): Promise<string>;
export declare function compareHash(rawPassword: string, hashedPassword: string): Promise<boolean>;
export declare function isAuthorized(req: AuthenticatedRequest, res: Response, next: NextFunction): void;
export declare const generateUUIDV4: () => string;
export declare const compressImage: (attachment: Attachment) => Promise<Buffer>;
