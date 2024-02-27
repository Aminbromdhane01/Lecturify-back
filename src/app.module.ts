import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@app/modules/user/user.module';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/data-source';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions)
    , ConfigModule.forRoot(
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
