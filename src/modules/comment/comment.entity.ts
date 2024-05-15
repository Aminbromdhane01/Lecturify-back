import { Book } from '@app/modules/book/book.entity';
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
