import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
  password: string;
  @Column()
  picture: string;
  @Column()
  gender: boolean;
  @Column()
  phonenumber: string;
  @Column()
  adress: string;
  @Column({ nullable: true })
  refreshToken: string
  @Column({ nullable: true })
  resetPasswordToken: string;
  // @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  //role: UserRole

}
