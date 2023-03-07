import { Injectable } from '@nestjs/common';
import { IGroupMessagesService } from './group-messages';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../utils/typeorm';
import { Repository } from 'typeorm';
import { CreateGroupMessageParams } from '../utils/types';

@Injectable()
export class GroupMessagesService implements IGroupMessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  createGroupMessage(params: CreateGroupMessageParams) {
    this.messageRepository.create();
  }
}
