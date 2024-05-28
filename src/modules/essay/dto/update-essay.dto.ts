import { CreateEssayDto } from '@app/modules/essay/dto/create-essay.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateEssayDto extends PartialType(CreateEssayDto) {
  isReviewd?: boolean;
}
