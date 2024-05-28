import { EssayController } from '@app/modules/essay/essay.controller';
import { ESSAY_REPOSITORY } from '@app/modules/essay/interfaces/essay.repository.interface';
import { ESSAY_SERVICE } from '@app/modules/essay/interfaces/essay.service.interface';
import { essayProviders } from '@app/modules/essay/providers/essay.providers';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [EssayController],
  providers: [...essayProviders],
  exports: [ESSAY_SERVICE, ESSAY_REPOSITORY],
})
export class EssayModule {}
