import { Module } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from '../utils/typeorm';
import { Services } from '../utils/constants';

@Module({
  imports: [TypeOrmModule.forFeature([Participant])],
  providers: [
    {
      provide: Services.PARTICIPANTS,
      useClass: ParticipantsService,
    },
  ],
  exports: [
    {
      provide: Services.PARTICIPANTS,
      useClass: ParticipantsService,
    },
  ],
})
export class ParticipantsModule {}
