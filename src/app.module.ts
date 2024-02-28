import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@app/modules/user/user.module';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/data-source';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions)
    , ConfigModule.forRoot(
      {
        cache: true,
        isGlobal: true,
        load: [configuration]
      }
    ), UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
