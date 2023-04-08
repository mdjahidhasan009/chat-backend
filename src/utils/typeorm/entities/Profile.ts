import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from './User';

@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column({ unique: true })
  // username: string;

  @Column({ default: '' })
  about?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  banner?: string;

  @OneToOne(() => User)
  user: User;
}