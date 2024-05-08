import { IsNotEmptyWithMessage } from '@app/decorators/is-notempty-with-message.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class GetBookByUserIdDto {
  @ApiProperty()
  @IsNotEmptyWithMessage()
  userId: number;
}
