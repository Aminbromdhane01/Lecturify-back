import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Author } from '../author/author.entity';
import { Comment } from '../comment/comment.entity';
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

  @Column()
  description: string;

  @CreateDateColumn()
  date: Date;

  @Column()
  genre: string;

  @Column({ default: 0 })
  rating: number;

  @Column()
  userId: number;

  @Column()
  authorId: number;

  @ManyToOne(() => User, (user) => user.books)
  @JoinColumn()
  user: User;

  @ManyToMany(() => User, (user) => user.wishlist, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  wishlistOwners: User[];

  @OneToMany(() => Comment, (comment) => comment.book, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  comments: Comment[];

  @ManyToOne(() => Author, (author) => author.books)
  @JoinColumn()
  author: Author;
}
