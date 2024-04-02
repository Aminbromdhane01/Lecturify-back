import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from '@app/modules/user/dto/create-user.dto';
import { IsStringWithMessage } from '@app/decorators/is-string-with-message.decorator';
import { IsNotEmptyWithMessage } from '@app/decorators/is-notempty-with-message.decorator';

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
