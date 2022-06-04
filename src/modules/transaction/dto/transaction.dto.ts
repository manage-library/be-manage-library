import { EVip } from './../../../common/enums/index';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ToBoolean } from '@src/common/decorators';

@Exclude()
export class GetTransactionDto {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Expose()
  userId: number;

  @ApiPropertyOptional({
    type: EVip,
    enum: Object.values(EVip),
  })
  @IsEnum(EVip)
  @IsOptional()
  @Expose()
  vipId: EVip;

  @ApiPropertyOptional()
  @IsBoolean()
  @ToBoolean()
  @IsOptional()
  @Expose()
  status: boolean;
}
