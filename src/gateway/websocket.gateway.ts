import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OnEvent } from '@nestjs/event-emitter';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class MessagingGateway implements OnGatewayConnection {
  handleConnection(client: Socket, ...args: any[]) {
    client.emit('connected', { status: 'good' });
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createMessage')
  handleCreateMessage(@MessageBody() data: any) {
    console.log('Create Message');
  }

  @OnEvent('message.create')
  handleMessageCreateEvent(payload: any) {
    console.log('hello msg');
    console.log(payload);
    this.server.emit('onMessage', payload);
  }
}
