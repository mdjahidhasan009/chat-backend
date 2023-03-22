import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MessagingGateway } from '../gateway/gateway';
import { FriendRequest } from '../utils/typeorm';

@Injectable()
export class FriendRequestsEvents {
  constructor(private readonly gateway: MessagingGateway) {}

  @OnEvent('friendrequest.create')
  friendRequestCreate(payload: FriendRequest) {
    const receiverSocket = this.gateway.sessions.getUserSocket(payload.receiver.id);
    if (receiverSocket) receiverSocket.emit('onFriendRequestReceived', payload);
  }
}