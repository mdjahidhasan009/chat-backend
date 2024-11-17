import { ServerEvents } from './../utils/constants';
import { OnEvent } from '@nestjs/event-emitter';
import { MessagingGateway } from './../gateway/gateway';
import { RemoveFriendEventPayload } from './../utils/types';
import { Injectable } from "@nestjs/common";

@Injectable()
export class FriendEvents {
  constructor(private readonly gateway: MessagingGateway) {}

  @OnEvent(ServerEvents.FRIEND_REMOVED)
  handleFriendRemoved({ userId, friend }: RemoveFriendEventPayload) {
    const { sender, receiver } = friend;
    const socket = this.gateway.sessions.getUserSocket(
      receiver.id === userId
        ? sender.id
        : receiver.id,
    );
    socket?.emit('onFriendRemoved', friend);
  }
}