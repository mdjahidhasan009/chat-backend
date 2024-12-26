import { ISession } from 'connect-typeorm';
export declare class Session implements ISession {
    expiredAt: number;
    id: string;
    json: string;
    destroyedAt: Date;
}
