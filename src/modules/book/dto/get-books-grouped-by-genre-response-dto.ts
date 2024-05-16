import { ApiProperty } from '@nestjs/swagger';

export class BooksGroupedByGenreDtoResponse {
  @ApiProperty()
  genre: string;

  @ApiProperty()
  count: number;
}
