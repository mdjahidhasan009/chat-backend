import { Entity, ManyToOne } from 'typeorm';
import { Group } from './Group';
import { BaseMessage } from './BaseMessage';

@Entity({ name: 'group_messages' })
export class GroupMessage extends BaseMessage {
  @ManyToOne(() => Group, (group) => group.messages)
  group: Group;
}
