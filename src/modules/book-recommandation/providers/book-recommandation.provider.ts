import { BookRecommandationService } from '@app/modules/book-recommandation/book-recommandation.service';
import { BOOK_RECOMMANDATION_SERVIVE } from '@app/modules/book-recommandation/book-recommandation.service.interface';
import type { Provider } from '@nestjs/common';

const BookRecommandationProviders: Provider[] = [
  {
    provide: BOOK_RECOMMANDATION_SERVIVE,
    useClass: BookRecommandationService,
  },
];

export { BookRecommandationProviders };
