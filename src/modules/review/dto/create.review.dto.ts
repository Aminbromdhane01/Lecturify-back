import { envConstants } from '@app/config/constants';
import { IsNotEmptyWithMessage } from '@app/decorators/is-notempty-with-message.decorator';
import { IsStringWithMessage } from '@app/decorators/is-string-with-message.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { Max, Min } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty()
  @IsStringWithMessage()
  comments: string;

  @ApiProperty()
  @IsNotEmptyWithMessage()
  @Min(0, { message: envConstants.ReviewModule.MIN_RATING_MESSAGE })
  @Max(5, { message: envConstants.ReviewModule.MAX_RATING_MESSAGE })
  rating: number;

  @ApiProperty()
  @IsNotEmptyWithMessage()
  essayId: number;
}
