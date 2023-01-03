import { Injectable } from '@nestjs/common';
import { IParticipantsService } from './participents';
import { InjectRepository } from '@nestjs/typeorm';
import { Participant } from '../utils/typeorm';
import { Repository } from 'typeorm';
import { CreateParticipantParams, FindParticipantParams } from '../utils/types';

@Injectable()
export class ParticipantsService implements IParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>,
  ) {}

  findParticipant(params: FindParticipantParams): Promise<Participant> | null {
    return this.participantRepository.findOne(params);
  }

  createParticipant(params: CreateParticipantParams): Promise<Participant> {
    const participant = this.participantRepository.create(params);
    return this.participantRepository.save(participant);
  }
}
