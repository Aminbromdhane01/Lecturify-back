import { AbstractGenericRepository } from '@app/comon/baserepository';
import type { CreateEssayDto } from '@app/modules/essay/dto/create-essay.dto';
import { Essay } from '@app/modules/essay/essay.entity';
import type { IEssayRepository } from '@app/modules/essay/interfaces/essay.repository.interface';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import type { UpdateEssayDto } from './dto/update-essay.dto';
@Injectable()
export class EssayRepository
  extends AbstractGenericRepository<Essay>
  implements IEssayRepository
{
  constructor(private readonly datasource: DataSource) {
    super(datasource, Essay);
  }

  async createEssay(createEssayDto: CreateEssayDto): Promise<Essay> {
    return this.createItem('Essay', createEssayDto);
  }

  async deletEssay(essayId: number): Promise<number> {
    return this.deleteItem('Essay', essayId);
  }

  async updateEssay(
    essayId: number,
    updateEssayDto: UpdateEssayDto,
  ): Promise<Essay | null> {
    return this.updateItem('Essay', essayId, updateEssayDto);
  }

  async getUnreviewedEssay(): Promise<Essay[]> {
    return this.createQueryBuilder()
      .where('essay.isReviewd = :isReviewd', { isReviewd: false })
      .getMany();
  }

  async getUserEssays(userId: number): Promise<Essay[]> {
    return this.createQueryBuilder()
      .where('essay.userId = :userId', { userId })
      .getMany();
  }

  async getEssaybyId(essayId: number): Promise<Essay | null> {
    return this.createQueryBuilder('essay')
      .leftJoinAndSelect('essay.user', 'user')
      .where('essay.id = :essayId', { essayId })
      .getOne();
  }
}
