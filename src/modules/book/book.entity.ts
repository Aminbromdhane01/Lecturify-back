import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../user/user.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  image: string;

  @CreateDateColumn()
  date: Date;

  @Column()
  genre: string;

  @Column({ default: 0 })
  rating: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.books)
  @JoinColumn()
  user: User;
}
