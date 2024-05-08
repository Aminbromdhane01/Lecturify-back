import { IsNotEmptyWithMessage } from '@app/decorators/is-notempty-with-message.decorator';

export class AddBookToWishlistDto {
  @IsNotEmptyWithMessage()
  userId: number;

  @IsNotEmptyWithMessage()
  bookId: number;
}
