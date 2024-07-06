import type { Provider } from '@nestjs/common';

import { CategoryRepository } from '../category.repository';
import { CategoryService } from '../category.service';
import { CATEGORY_REPOSITORY } from '../interfaces/category.repository.interface';
import { CATEGORY_SERVICE } from '../interfaces/category.service.interface';

const categoryProviders: Provider[] = [
  {
    provide: CATEGORY_SERVICE,
    useClass: CategoryService,
  },
  {
    provide: CATEGORY_REPOSITORY,
    useClass: CategoryRepository,
  },
];

export { categoryProviders };
