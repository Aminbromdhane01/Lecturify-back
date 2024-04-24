import { envConstants } from '@app/config/constants';
import { IsNotEmptyWithMessage } from '@app/decorators/is-notempty-with-message.decorator';
import { IsStringWithMessage } from '@app/decorators/is-string-with-message.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    description: envConstants.BookModule.BOOK_TITLE_DESCRIPTION,
    example: envConstants.BookModule.BOOK_TITLE_EXAMPLE,
  })
  @IsNotEmptyWithMessage()
  @IsStringWithMessage()
  title: string;

  @ApiProperty({
    description: envConstants.BookModule.BOOK_CONTENT_DESCRIPTION,
    example: envConstants.BookModule.BOOK_CONTENT_EXAMPLE,
  })
  @IsNotEmptyWithMessage()
  content: string;

  @ApiProperty({
    description: envConstants.BookModule.IMAGE_URL_DESCRIPTION,
    example: envConstants.BookModule.IMAGE_URL_EXAMPLE,
  })
  image: string;

  @ApiProperty({
    description: envConstants.BookModule.DATE_DESCRIPTION,
    example: envConstants.BookModule.DATE_EXAMPLE,
  })
  @ApiProperty({
    description: envConstants.BookModule.GENRE_DESCRIPTION,
    example: envConstants.BookModule.GENRE_EXAMPLE,
  })
  @IsNotEmptyWithMessage()
  @IsStringWithMessage()
  genre: string;

  @ApiProperty({
    description: envConstants.BookModule.BOOK_RATING_DESCRIPTION,
    example: envConstants.BookModule.BOOK_RATING_EXAMPLE,
  })
  @ApiProperty({
    description: envConstants.BookModule.USER_ID_DESCRIPTION,
    example: envConstants.BookModule.USER_ID_EXAMPLE,
  })
  @IsNotEmptyWithMessage()
  userId: number;
}
