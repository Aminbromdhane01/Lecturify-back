import { IsNotEmptyWithMessage } from '@app/decorators/is-notempty-with-message.decorator';
import { IsStringWithMessage } from '@app/decorators/is-string-with-message.decorator';

export class CreateCommentDto {
  @IsNotEmptyWithMessage()
  userId: number;

  @IsNotEmptyWithMessage()
  bookId: number;

  @IsStringWithMessage()
  @IsNotEmptyWithMessage()
  text: string;

  sentiment: string;
}
