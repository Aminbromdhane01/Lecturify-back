import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Essay } from '../essay/essay.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comments: string;

  @Column()
  rating: number;

  @Column()
  essayId: number;

  @JoinColumn()
  @ManyToOne(() => Essay, (essay) => essay.reviews)
  essay: Essay;
}
