import { FriendStatus } from './../../types';
import { 
  Entity, 
  JoinColumn, 
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  Column
} from 'typeorm';
import { User } from './User';


@Entity({ name: 'friends' })
export class Friend {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn()
  sender: User;

  @OneToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn()
  recevier: User;

  @CreateDateColumn()
  createdAt: number;

  @Column()
  status: FriendStatus
}