import { IsNotEmptyWithMessage } from '@app/decorators/is-notempty-with-message.decorator';
import { IsStringWithMessage } from '@app/decorators/is-string-with-message.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty()
  @IsNotEmptyWithMessage()
  userId: number;

  @ApiProperty()
  @IsStringWithMessage()
  content: string;
}
