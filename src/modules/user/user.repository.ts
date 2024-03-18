import { AbstractGenericRepository } from '@app/baserepository';
import { CreateUserDto } from '@app/modules/user/dto/create-user.dto';
import { UpdateUserDto } from '@app/modules/user/dto/update-user.dto';
import { IUserRepository } from '@app/modules/user/interfaces/user.repository.interface';
import { User } from '@app/modules/user/user.entity';
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
@Injectable()
export class UserRepository
  extends AbstractGenericRepository<User>
  implements IUserRepository
{
  constructor(private readonly datasource: DataSource) {
    super(datasource, User);
  }
  async findbyResetToken(token: string): Promise<User> {
    return await this.findOne({ where: { resetPasswordToken: token } });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    return await this.save(user);
  }

  async findByid(id: string): Promise<User> {
    return await this.findOne({ where: { id: id } });
  }
  async findByemail(email: string): Promise<User> {
    return await this.findOne({ where: { email: email } });
  }
  async updateUser(id: string, user: UpdateUserDto): Promise<User> {
    await this.update(id, user);
    return await this.findOne({ where: { id: id } });
  }
}
