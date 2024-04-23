import { envConstants } from '@app/config/constants';
import { Module } from '@nestjs/common';

import { BcryptProvider } from './bcrypt.provider';
import { BCRYPT_SERVICE } from './bcrypt.service.interface';

@Module({
  providers: [...BcryptProvider],
  exports: [envConstants.Bcrypt.BCRYPT, BCRYPT_SERVICE],
})
export class BcryptModule {}
