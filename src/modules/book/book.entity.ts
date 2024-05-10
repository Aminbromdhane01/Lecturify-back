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

  @ManyToMany(() => User, (user) => user.wishlist)
  wishlistOwners: User[];

  @OneToMany(() => Comment, (comment) => comment.book)
  comments: Comment[];
}
