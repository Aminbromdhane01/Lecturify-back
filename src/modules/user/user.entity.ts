import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose, Transform } from 'class-transformer';
enum UserRole {
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
  refreshToken: string
  @Column({ nullable: true })
  resetPasswordToken: string;


  @Expose()
  get fullName(): string {
    return this.firstname + ' ' + this.lastname
  }
  @Expose()
  @Transform(({ value }) => value ? 'female' : 'male')
  get genderText(): string {
    return this.gender ? 'female' : 'male';
  }
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

}
