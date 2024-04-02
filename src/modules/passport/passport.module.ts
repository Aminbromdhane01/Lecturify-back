import { Module } from '@nestjs/common';
import { AuthService } from '@app/modules/auth/auth.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  controllers: [],
  providers: [AuthService],
})
export class PassportAuthModule {}
