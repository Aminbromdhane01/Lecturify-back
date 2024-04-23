import { IsNotEmptyWithMessage } from '@app/decorators/is-notempty-with-message.decorator';
import { IsStringWithMessage } from '@app/decorators/is-string-with-message.decorator';
import { CreateUserDto } from '@app/modules/user/dto/create-user.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsStringWithMessage()
  @IsNotEmptyWithMessage()
  picture?: string;

  @IsStringWithMessage()
  @IsNotEmptyWithMessage()
  phonenumber?: string;

  @IsStringWithMessage()
  @IsNotEmptyWithMessage()
  adress?: string;

  @IsStringWithMessage()
  @IsNotEmptyWithMessage()
  refreshToken?: string;

  @IsStringWithMessage()
  @IsNotEmptyWithMessage()
  resetPasswordToken?: string;
}
