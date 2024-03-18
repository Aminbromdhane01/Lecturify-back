import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from '@app/modules/user/dto/create-user.dto';
import { IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  picture?: string;
  @IsString()
  phonenumber?: string;
  @IsString()
  adress?: string;
  @IsString()
  refreshToken?: string;
  @IsString()
  resetPasswordToken?: string;
}
