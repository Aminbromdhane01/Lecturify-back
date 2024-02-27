import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: String;
    @Column()
    firstname: String;
    @Column()
    lastname: String;
    @Column()
    email: String;
    @Column()
    password: String;
    @Column()
    picture: String;
    @Column()
    gender: Boolean;
    @Column()
    phonenumber: String;
    @Column()
    adress: String;

}
