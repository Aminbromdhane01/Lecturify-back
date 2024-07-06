import type { Provider } from '@nestjs/common';

import { AuthorRepository } from '../author.repository';
import { AuthorService } from '../author.service';
import { AUTHOR_REPOSITORY } from '../interfaces/author.repository.interface';
import { AUTHOR_SERVICE } from '../interfaces/author.service.interface';

const authorProviders: Provider[] = [
  {
    provide: AUTHOR_SERVICE,
    useClass: AuthorService,
  },
  {
    provide: AUTHOR_REPOSITORY,
    useClass: AuthorRepository,
  },
];

export { authorProviders };
