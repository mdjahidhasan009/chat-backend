import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Conversation } from './Conversation';
import { BaseMessage } from './BaseMessage';
import { MessageAttachment } from './MessageAttachment';

@Entity({ name: 'messages' })
export class Message extends BaseMessage {
  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;

  @OneToMany(() => MessageAttachment, (attachment) => attachment.message)
  @JoinColumn()
  attachments: MessageAttachment[];
}
