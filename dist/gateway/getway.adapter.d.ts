import { IoAdapter } from '@nestjs/platform-socket.io';
export declare class WebsocketAdapter extends IoAdapter {
    createIOServer(port: number, options?: any): any;
}
