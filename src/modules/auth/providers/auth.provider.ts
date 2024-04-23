import type { Provider } from '@nestjs/common';

import { AuthService } from '../auth.service';
import { AUTH_SERVICE } from '../interfaces/auth.service.interface';

export const authProviders: Provider[] = [
  {
    provide: AUTH_SERVICE,
    useClass: AuthService,
  },
];
