import { ServerEvents, WebsocketEvents } from './../utils/constants';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MessagingGateway } from '../gateway/gateway';
import { FriendRequest } from '../utils/typeorm';
import { AcceptFriendRequestResponse } from 'src/utils/types';

@Injectable()
export class FriendRequestsEvents {
  constructor(private readonly gateway: MessagingGateway) {}

  @OnEvent('friendrequest.create')
  friendRequestCreate(payload: FriendRequest) {
    const receiverSocket = this.gateway.sessions.getUserSocket(payload.receiver.id);
    receiverSocket && receiverSocket.emit('onFriendRequestReceived', payload);
  }

  @OnEvent('friendrequest.cancel')
  handleFriendRequestCancel(payload: FriendRequest) {
    const receiverSocket = this.gateway.sessions.getUserSocket(payload.receiver.id);
    receiverSocket && receiverSocket.emit('onFriendRequestCancelled', payload);
  }

  @OnEvent(ServerEvents.FRIEND_REQUEST_ACCEPTED)
  handleFriendRequestAccepted(payload: AcceptFriendRequestResponse) {
    const senderSocket = this.gateway.sessions.getUserSocket(payload.friendRequest.sender.id);
    senderSocket && senderSocket.emit(WebsocketEvents.FRIEND_REQUEST_ACCEPTED, payload);
  }

  @OnEvent(ServerEvents.FRIEND_REQUEST_REJECTED)
  handleFriendRequestRejected(payload: FriendRequest) {
    const senderSocket = this.gateway.sessions.getUserSocket(payload.sender.id);
    senderSocket && senderSocket.emit(WebsocketEvents.FRIEND_REQUEST_REJECTED, payload);
  }
}