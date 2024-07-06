import { IsNotEmptyWithMessage } from '@app/decorators/is-notempty-with-message.decorator';
import { IsStringWithMessage } from '@app/decorators/is-string-with-message.decorator';

export class CreateCategoryDto {
  @IsStringWithMessage()
  @IsNotEmptyWithMessage()
  type: string;
}
