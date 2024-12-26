import { ThrottlerGuard } from "@nestjs/throttler";
export declare class ThrottlerBehindProxyGuard extends ThrottlerGuard {
    protected getTracker(req: Record<string, any>): string;
}
