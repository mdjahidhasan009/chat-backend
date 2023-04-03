import { ServerEvents } from './../utils/constants';
import { OnEvent } from '@nestjs/event-emitter';
import { MessagingGateway } from './../gateway/gateway';
import { RemoveFriendEventPayload } from './../utils/types';
import { Injectable } from "@nestjs/common";

@Injectable()
export class FriendEvents {
  constructor(private readonly getway: MessagingGateway) {}

  @OnEvent(ServerEvents.FRIEND_REMOVED)
  handleFriendRemoved({ userId, friend }: RemoveFriendEventPayload) {
    const { sender, receiver } = friend;
    const socket = this.getway.sessions.getUserSocket(
      receiver.id === userId
        ? userId
        : receiver.id,
    );
    socket?.emit(ServerEvents.FRIEND_REMOVED, { friend });
  }
}