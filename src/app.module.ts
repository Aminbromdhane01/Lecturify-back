import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@app/modules/user/user.module';
import configuration from './config/configuration';

@Module({
  imports: [ConfigModule.forRoot(
    {
      cache: true,
      isGlobal: true,
      load: [configuration]
    }
  ), UserModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
