import { IsStringWithMessage } from '@app/decorators/is-string-with-message.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AnalyseCommentResponseDto {
  @ApiProperty()
  @IsStringWithMessage()
  sentiment: string;

  @ApiProperty()
  @IsNumber()
  score: number;
}
