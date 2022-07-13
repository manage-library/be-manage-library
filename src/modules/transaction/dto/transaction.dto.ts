import { EVip } from './../../../common/enums/index';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
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

@Exclude()
export class RechargeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  signature: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  tranId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ackTime: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  partnerId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  partnerName: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  comment: string;
}

@Exclude()
export class CreateTransactionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  vipId: number;
}
