import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    gender: Boolean;
    @Column()
    phonenumber: string;
    @Column()
    adress: string;
    @Column({ nullable: true })
    refreshToken: string;

}
