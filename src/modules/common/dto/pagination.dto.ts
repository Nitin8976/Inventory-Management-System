import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ description: 'Page number', required: false, default: 0 })
  @IsOptional()
  page?: number = 0;

  @ApiProperty({ description: 'Page size', required: false, default: 10 })
  @IsOptional()
  limit?: number = 10;

  @ApiProperty({ description: 'Field name', required: false, default: 'createdAt' })
  @IsOptional()
  sortBy?: string = 'createdAt';

  @ApiProperty({ description: 'ASC OR DESC', required: false, default: 'DESC' })
  @IsOptional()
  orderBy?: 'DESC' | 'ASC' = 'DESC';

  @ApiProperty({ description: 'Searching Keyword', required: false, default: '' })
  @IsOptional()
  search?: string;
}
