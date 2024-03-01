import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [ConfigModule.forRoot(
    {
     
      isGlobal: true
     
    }
  )],
  controllers: [],
  providers: [],
})
export class AppModule { }
