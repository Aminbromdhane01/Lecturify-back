import { User } from '@app/modules/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  content: string;

  @CreateDateColumn()
  date: Date;

  @Column({ default: false })
  isRead: boolean;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.notifications)
  @JoinColumn()
  user: User;
}
