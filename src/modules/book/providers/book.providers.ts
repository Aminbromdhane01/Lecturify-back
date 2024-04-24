import type { Provider } from '@nestjs/common';

import { BookReposotiroy } from '../book.repository';
import { BookService } from '../book.service';
import { BOOK_REPOSITORY } from '../interfaces/book.repository.interface';
import { BOOK_SERVICE } from '../interfaces/book.service.interface';

const BookProviders: Provider[] = [
  {
    provide: BOOK_SERVICE,
    useClass: BookService,
  },
  {
    provide: BOOK_REPOSITORY,
    useClass: BookReposotiroy,
  },
];

export { BookProviders };
