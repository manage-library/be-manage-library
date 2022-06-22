import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Exclude()
export class PaginateDto {
  @ApiPropertyOptional()
  @IsNumber()
  @Expose()
  page?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @Expose()
  perPage?: number;
}
