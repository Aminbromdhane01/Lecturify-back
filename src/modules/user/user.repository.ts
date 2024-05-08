import { AbstractGenericRepository } from '@app/comon/baserepository';
import type { CreateUserDto } from '@app/modules/user/dto/create-user.dto';
import type { UpdateUserDto } from '@app/modules/user/dto/update-user.dto';
import type { IUserRepository } from '@app/modules/user/interfaces/user.repository.interface';
import { User } from '@app/modules/user/user.entity';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
@Injectable()
export class UserRepository
  extends AbstractGenericRepository<User>
  implements IUserRepository
{
  constructor(private readonly datasource: DataSource) {
    super(datasource, User);
  }

  async findbyResetToken(token: string): Promise<User | null> {
    return this.findOne({ where: { resetPasswordToken: token } });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    return this.save(user);
  }

  async findByid(id: string): Promise<User | null> {
    return this.findOne({ where: { id } });
  }

  async findByemail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<User | null> {
    await this.update(id, user);

    return this.findOne({ where: { id } });
  }

  async findUserWishlist(id: number): Promise<User | null> {
    return this.createQueryBuilder('user')
      .leftJoinAndSelect('user.wishlist', 'wishlist')
      .where('user.id = :id', { id })
      .getOne();
  }

  async saveUser(user: User): Promise<User> {
    return this.save(user);
  }
}
