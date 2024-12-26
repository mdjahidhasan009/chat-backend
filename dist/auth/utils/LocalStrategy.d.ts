import { Strategy } from 'passport-local';
import { IAuthService } from '../auth';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly authService;
    constructor(authService: IAuthService);
    validate(username: string, password: string): Promise<import("../../utils/typeorm").User>;
}
export {};
