import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '@app/modules/user/user.module';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbstractDataSource } from './database/data-source';
import { AuthModule } from './modules/auth/auth.module';
import { ResetPasswordModule } from './modules/reset-password/reset-password.module';
import { dataSourceOptions } from './database/data-source-options';
import { DataBaseModule } from './database/data-source.module';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
      }
    ), UserModule, AuthModule, ResetPasswordModule, forwardRef(() => DataBaseModule)],
  controllers: [],
  providers: [],
})
export class AppModule { }
