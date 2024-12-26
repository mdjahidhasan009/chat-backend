import { AuthenticatedSocket } from '../utils/interfaces';
export interface IGatewaySessionManager {
    getUserSocket(id: number): AuthenticatedSocket;
    setUserSocket(id: number, socket: AuthenticatedSocket): void;
    removeUserSocket(id: number): void;
    getSockets(): Map<number, AuthenticatedSocket>;
}
export declare class GatewaySessionManager implements IGatewaySessionManager {
    private readonly sessions;
    getUserSocket(id: number): AuthenticatedSocket;
    setUserSocket(userId: number, socket: AuthenticatedSocket): void;
    removeUserSocket(userId: number): void;
    getSockets(): Map<number, AuthenticatedSocket>;
}
