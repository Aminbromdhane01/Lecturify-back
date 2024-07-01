import { IsNotEmptyWithMessage } from '@app/decorators/is-notempty-with-message.decorator';
import { IsStringWithMessage } from '@app/decorators/is-string-with-message.decorator';
import { CreateUserDto } from '@app/modules/user/dto/create-user.dto';
import { PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsStringWithMessage()
  @IsNotEmptyWithMessage()
  @IsOptional()
  picture?: string;

  @IsStringWithMessage()
  @IsNotEmptyWithMessage()
  @IsOptional()
  phonenumber?: string;

  @IsStringWithMessage()
  @IsNotEmptyWithMessage()
  @IsOptional()
  adress?: string;

  @IsStringWithMessage()
  @IsNotEmptyWithMessage()
  @IsOptional()
  refreshToken?: string;

  @IsStringWithMessage()
  @IsNotEmptyWithMessage()
  @IsOptional()
  resetPasswordToken?: string;
}
