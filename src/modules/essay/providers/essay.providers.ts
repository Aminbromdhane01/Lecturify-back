import { EssayRepository } from '@app/modules/essay/essay.repository';
import { EssayService } from '@app/modules/essay/essay.service';
import { ESSAY_REPOSITORY } from '@app/modules/essay/interfaces/essay.repository.interface';
import { ESSAY_SERVICE } from '@app/modules/essay/interfaces/essay.service.interface';
import type { Provider } from '@nestjs/common';

const essayProviders: Provider[] = [
  {
    provide: ESSAY_SERVICE,
    useClass: EssayService,
  },
  {
    provide: ESSAY_REPOSITORY,
    useClass: EssayRepository,
  },
];

export { essayProviders };
