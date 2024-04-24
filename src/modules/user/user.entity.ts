import { Exclude, Expose, Transform } from 'class-transformer';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Book } from '../book/book.entity';

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

  @OneToMany(() => Book, (book) => book.user)
  books: Book[];

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
