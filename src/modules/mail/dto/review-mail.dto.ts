import { IsNotEmptyWithMessage } from '@app/decorators/is-notempty-with-message.decorator';
import { IsStringWithMessage } from '@app/decorators/is-string-with-message.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class IReviewMailDto {
  @ApiProperty()
  @IsStringWithMessage()
  email: string;

  @ApiProperty()
  @IsStringWithMessage()
  username: string;

  @ApiProperty()
  @IsStringWithMessage()
  comments: string;

  @ApiProperty()
  @IsNotEmptyWithMessage()
  score: number;
}
