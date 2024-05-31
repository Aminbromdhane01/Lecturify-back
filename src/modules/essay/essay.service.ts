import type { CreateEssayDto } from '@app/modules/essay/dto/create-essay.dto';
import type { Essay } from '@app/modules/essay/essay.entity';
import {
  ESSAY_REPOSITORY,
  IEssayRepository,
} from '@app/modules/essay/interfaces/essay.repository.interface';
import type { IEssayService } from '@app/modules/essay/interfaces/essay.service.interface';
import { Inject } from '@nestjs/common';

import type { GetEssayDto } from './dto/get-essay.dto';
import type { UpdateEssayDto } from './dto/update-essay.dto';

export class EssayService implements IEssayService {
  @Inject(ESSAY_REPOSITORY)
  private readonly essayRepository: IEssayRepository;

  async createEssay(createEssayDto: CreateEssayDto): Promise<Essay> {
    return this.essayRepository.createEssay(createEssayDto);
  }

  async deletEssay(essayId: number): Promise<number> {
    return this.essayRepository.deletEssay(essayId);
  }

  async updateEssay(
    essayId: number,
    updateEssayDto: UpdateEssayDto,
  ): Promise<Essay | null> {
    return this.essayRepository.updateEssay(essayId, updateEssayDto);
  }

  async getUnreviewedEssay({
    page,
    itemPerPage,
  }: GetEssayDto): Promise<{ essays: Essay[]; total: number }> {
    return this.essayRepository.getUnreviewedEssay({ page, itemPerPage });
  }

  async getUserEssays(userId: number): Promise<Essay[]> {
    return this.essayRepository.getUserEssays(userId);
  }

  async getEssaybyId(essayId: number): Promise<Essay | null> {
    return this.essayRepository.getEssaybyId(essayId);
  }
}
