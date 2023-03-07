import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn, ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './Message';
import { Group } from './Group';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Message, (message) => message.author)
  @JoinColumn()
  messages: Message[];

  @ManyToMany(() => Group, (group) => group.users)
  groups: Group[];
}
