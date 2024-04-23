import type { Provider } from '@nestjs/common';

import { USER_REPOSITORY } from '../interfaces/user.repository.interface';
import { USER_SERVICE } from '../interfaces/user.service.interface';
import { UserRepository } from '../user.repository';
import { UserService } from '../user.service';

const userProviders: Provider[] = [
  {
    provide: USER_SERVICE,
    useClass: UserService,
  },
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository,
  },
];

export { userProviders };
