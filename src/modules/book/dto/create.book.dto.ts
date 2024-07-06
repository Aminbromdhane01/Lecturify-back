import { envConstants } from '@app/config/constants';
import { IsNotEmptyWithMessage } from '@app/decorators/is-notempty-with-message.decorator';
import { IsStringWithMessage } from '@app/decorators/is-string-with-message.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @IsNotEmptyWithMessage()
  @IsStringWithMessage()
  @ApiProperty({
    description: envConstants.BookModule.BOOK_TITLE_DESCRIPTION,
    example: envConstants.BookModule.BOOK_TITLE_EXAMPLE,
  })
  title: string;

  content: string;

  image: string;

  @IsNotEmptyWithMessage()
  @IsStringWithMessage()
  @ApiProperty({
    description: envConstants.BookModule.GENRE_DESCRIPTION,
    example: envConstants.BookModule.GENRE_EXAMPLE,
  })
  genre: string;

  @ApiProperty({
    type: envConstants.BookModule.FILES_ARRAY_TYPE,
    items: {
      type: envConstants.BookModule.FILES_ARRAY_ITEMS_TYPE,
      format: envConstants.BookModule.FILES_ARRAY_ITEMS_FORMAT,
    },
    description: envConstants.BookModule.FILES_ARRAY_DESCRIPTION,
  })
  files?: Express.Multer.File[];

  @ApiProperty({
    description: envConstants.BookModule.USER_ID_DESCRIPTION,
    example: envConstants.BookModule.USER_ID_EXAMPLE,
  })
  userId: number;

  authorId: number;

  @IsNotEmptyWithMessage()
  @IsStringWithMessage()
  description: string;
}
