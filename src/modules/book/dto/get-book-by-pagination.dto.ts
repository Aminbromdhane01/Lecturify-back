import { IsNotEmptyWithMessage } from '@app/decorators/is-notempty-with-message.decorator';
import { IsString } from 'class-validator';

export class GetBooksByPaginationDto {
  @IsNotEmptyWithMessage()
  itemPerPage: number;

  @IsNotEmptyWithMessage()
  page: number;

  @IsNotEmptyWithMessage()
  @IsString()
  keyword: string;
}
