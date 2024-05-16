import { IsStringWithMessage } from '@app/decorators/is-string-with-message.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class AnalyseCommenteDto {
  @ApiProperty()
  @IsStringWithMessage()
  text: string;
}
