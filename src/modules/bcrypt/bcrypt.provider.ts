import { envConstants } from '@app/config/constants';
import type { Provider } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { BcryptService } from './bcrypt.service';
import { BCRYPT_SERVICE } from './bcrypt.service.interface';

export const BcryptProvider: Provider[] = [
  {
    provide: envConstants.Bcrypt.BCRYPT,
    useValue: bcrypt,
  },
  {
    provide: BCRYPT_SERVICE,
    useClass: BcryptService,
  },
];
