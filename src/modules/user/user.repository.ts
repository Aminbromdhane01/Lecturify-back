import { AbstractGenericRepository } from "@app/baserepository";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { IUserRepository } from "./interfaces/user.repository.interface";
import { User } from "./user.entity";
import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";
@Injectable()
export class UserRepository extends AbstractGenericRepository<User> implements IUserRepository {
    constructor(private readonly datasource: DataSource) {
        super(datasource, User)
    }


    async createUser(user: CreateUserDto): Promise<User> {
        return await this.save(user)
    }

    findByid(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    async findByemail(email: string): Promise<User> {
        return await this.findOne({ where: { email: email } })
    }
    async updateUser(id: string, user: UpdateUserDto): Promise<User> {
        await this.update(id, user);
        return await this.findOne({ where: { id: id } });


    }



}