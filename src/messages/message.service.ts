import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IMessageService } from './message';
import { Conversation, Message, User } from '../utils/typeorm';
import { CreateMessageParams } from '../utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class MessageService implements IMessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) {}
  async createMessage({
    user,
    content,
    conversationId,
  }: CreateMessageParams): Promise<Message> {
    const conversation = await this.conversationRepository.findOne({
      where: { id: conversationId },
      relations: ['creator', 'recipient'],
    });
    if (!conversation) {
      throw new HttpException('Conversation not found', HttpStatus.BAD_REQUEST);
    }
    const { creator, recipient } = conversation;
    if (creator.id === user.id && recipient.id === user.id)
      throw new HttpException('Cannot Create Message', HttpStatus.FORBIDDEN);

    // conversation.creator = instanceToPlain(conversation.creator) as User;
    // conversation.recipient = instanceToPlain(conversation.recipient) as User;
    const newMessage = this.messageRepository.create({
      content,
      conversation,
      author: instanceToPlain(user),
    });
    const savedMessage = await this.messageRepository.save(newMessage);
    conversation.lastMessageSent = savedMessage;
    await this.conversationRepository.save(conversation);
    return savedMessage;
  }

  getMessagesByConversationId(conversationId: number): Promise<Message[]> {
    return this.messageRepository.find({
      where: {
        conversation: {
          id: conversationId,
        },
      },
      order: {
        createdAt: 'DESC',
      },
      relations: ['author'],
    });
  }
}
