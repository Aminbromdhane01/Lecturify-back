import { envConstants } from '@app/config/constants';
import type { CreateEssayDto } from '@app/modules/essay/dto/create-essay.dto';
import type { UpdateEssayDto } from '@app/modules/essay/dto/update-essay.dto';
import type { Essay } from '@app/modules/essay/essay.entity';

import type { GetEssayDto } from '../dto/get-essay.dto';
export const ESSAY_SERVICE = Symbol(
  envConstants.ReviewModule.ESSAY_SERVICE,
);
export interface IEssayService {
  createEssay(createEssayDto: CreateEssayDto): Promise<Essay>;
  deletEssay(essayId: number): Promise<number>;
  updateEssay(
    essayId: number,
    updateEssayDto: UpdateEssayDto,
  ): Promise<Essay | null>;
  getUnreviewedEssay({
    page,
    itemPerPage,
  }: GetEssayDto): Promise<{ essays: Essay[]; total: number }>;
  getUserEssays(userId: number): Promise<Essay[]>;
  getEssaybyId(essayId: number): Promise<Essay | null>;
}
