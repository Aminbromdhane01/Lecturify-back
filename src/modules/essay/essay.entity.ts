import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Review } from '../review/review.entity';
import { User } from '../user/user.entity';

@Entity()
export class Essay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  userId: number;

  @Column()
  isReviewd: boolean;

  @JoinColumn()
  @ManyToOne(() => User, (user) => user.essays)
  user: User;

  @OneToMany(() => Review, (review) => review.essay)
  reviews: Review[];
}
