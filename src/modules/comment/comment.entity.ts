import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Book } from '../book/book.entity';
import { User } from '../user/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  sentiment: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column()
  userId: number;

  @Column()
  bookId: number;

  @ManyToOne(() => Book, (book) => book.comments)
  @JoinColumn()
  book: Book;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn()
  user: User;
}
