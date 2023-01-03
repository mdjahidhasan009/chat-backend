import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IConversationsService } from './conversations';
import { CreateConversationParams } from '../utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation, Participant, User } from '../utils/typeorm';
import { Repository } from 'typeorm';
import { Services } from '../utils/constants';
import { IParticipantsService } from '../participants/participents';
import { IUserService } from '../users/user';

@Injectable()
export class ConversationsService implements IConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @Inject(Services.PARTICIPANTS)
    private readonly participantsService: IParticipantsService,
    @Inject(Services.USERS)
    private readonly userService: IUserService,
  ) {}
  async createConversation(user: User, params: CreateConversationParams) {
    const userDB = await this.userService.findUser({ id: user.id });
    const { authorId, recipientId } = params;
    const participants: Participant[] = [];
    if (!userDB.participant) {
      const participant = await this.createParticipantAndSaveUser(
        userDB,
        authorId,
      );
      participants.push(participant);
    } else participants.push(userDB.participant);

    const recipient = await this.userService.findUser({ id: recipientId });
    if (!recipient)
      throw new HttpException('Recipient not found', HttpStatus.BAD_REQUEST);

    if (!recipient.participant) {
      await this.createParticipantAndSaveUser(recipient, recipientId);
    } else participants.push(recipient.participant);

    const conversation = this.conversationRepository.create({
      participants,
    });
    return this.conversationRepository.save(conversation);
  }

  public async createParticipantAndSaveUser(user: User, id: number) {
    const participant = await this.participantsService.createParticipant({
      id,
    });
    user.participant = participant;
    await this.userService.saveUser(user);
    return participant;
  }
}
