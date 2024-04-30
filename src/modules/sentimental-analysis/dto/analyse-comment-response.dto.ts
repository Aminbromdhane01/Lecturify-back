import { IsStringWithMessage } from '@app/decorators/is-string-with-message.decorator';
import { IsNumber } from 'class-validator';

export class AnalyseCommentResponseDto {
  @IsStringWithMessage()
  sentiment: string;

  @IsNumber()
  score: number;
}
