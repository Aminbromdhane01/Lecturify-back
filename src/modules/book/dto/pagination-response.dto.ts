import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponseDto<T> {
  @ApiProperty({ type: [] })
  data: T[];

  @ApiProperty({ type: Number })
  count: number;
}
