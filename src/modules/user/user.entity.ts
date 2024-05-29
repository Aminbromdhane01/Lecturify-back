import { Exclude, Expose, Transform } from 'class-transformer';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Book } from '../book/book.entity';
import { Comment } from '../comment/comment.entity';
import { Essay } from '../essay/essay.entity';
import { Notification } from '../notifications/notification.entity';
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  AUTHOR = 'AUTHOR',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  picture: string;

  @Column()
  @Exclude()
  gender: boolean;

  @Column()
  phonenumber: string;

  @Column()
  adress: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ nullable: true })
  resetPasswordToken: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => Book, (book) => book.user)
  books: Book[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @ManyToMany(() => Book, (book) => book.wishlistOwners)
  @JoinTable()
  wishlist: Book[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Essay, (essay) => essay.user)
  essays: Essay[];

  @Expose()
  get fullName(): string {
    return `${this.firstname} ${this.lastname}`;
  }

  @Expose()
  @Transform(({ value }) => (value ? 'female' : 'male'))
  get genderText(): string {
    return this.gender ? 'female' : 'male';
  }

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
