import { ApiProperty } from '@nestjs/swagger';

export class GetEssayDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  itemPerPage: number;
}
