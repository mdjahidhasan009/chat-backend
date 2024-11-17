import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user_presence' })
export class UserPresence {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  statusMessage?: string;

  ////TODO: will make it default false
  @Column({ nullable: false })
  showOffline: boolean;
}