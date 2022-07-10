import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ToBoolean } from '@src/common/decorators';
import { EReleaseStatus, ESortBy, ESortType } from '@src/common/enums';
import { Exclude, Expose } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@Exclude()
export class CreateChapterRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;

  @ApiProperty()
  @IsString()
  @Expose()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose()
  content: string;
}

@Exclude()
export class UpdateChapterRequestDto {
  @ApiPropertyOptional()
  @IsString()
  @Expose()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @Expose()
  description: string;

  @ApiPropertyOptional()
  @IsString()
  @Expose()
  content: string;
}

@Exclude()
export class CreateBookRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @Expose()
  description: string;

  @ApiPropertyOptional()
  @IsString()
  @Expose()
  authorDescription: string;

  @ApiPropertyOptional()
  @IsString()
  @Expose()
  image: string;

  @ApiProperty({
    enum: EReleaseStatus,
    default: EReleaseStatus.RELEASING,
    examples: EReleaseStatus,
  })
  @IsNotEmpty()
  @Expose()
  releaseStatus: EReleaseStatus;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  @Expose()
  isVisible: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  @Expose()
  isVip: boolean;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  @Expose()
  categoryIds: number[];

  // @Expose()
  // @ApiProperty({ type: () => [CreateChapterRequestDto] })
  // @IsArray()
  // @Expose()
  // chapters: CreateChapterRequestDto[];
}

@Exclude()
export class UpdateBookRequestDto {
  @ApiPropertyOptional()
  @IsString()
  @Expose()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @Expose()
  description: string;

  @ApiPropertyOptional()
  @IsString()
  @Expose()
  authorDescription: string;

  @ApiPropertyOptional()
  @IsString()
  @Expose()
  image: string;

  @ApiPropertyOptional({
    enum: EReleaseStatus,
    default: EReleaseStatus.RELEASING,
    examples: EReleaseStatus,
  })
  @Expose()
  releaseStatus: EReleaseStatus;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsBoolean()
  @Expose()
  isVisible: boolean;

  @ApiPropertyOptional()
  @IsArray()
  @Expose()
  categoryIds: number[];
}

@Exclude()
export class CrawlBook {
  @ApiProperty()
  @IsArray()
  @Expose()
  data: any;
}

@Exclude()
export class QueryBookDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Expose()
  bookName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Expose()
  authorName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Expose()
  categoryId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  categoryName: number;

  @ApiPropertyOptional()
  @ToBoolean()
  @IsOptional()
  @IsBoolean()
  @Expose()
  isVip: boolean;

  @ApiPropertyOptional({
    type: EReleaseStatus,
    enum: Object.values(EReleaseStatus),
  })
  @IsEnum(EReleaseStatus)
  @IsOptional()
  @Expose()
  releaseStatus: EReleaseStatus;

  @ApiPropertyOptional({
    type: ESortBy,
    enum: Object.values(ESortBy),
  })
  @IsOptional()
  @IsEnum(ESortBy)
  @Expose()
  sortBy: ESortBy;

  @ApiPropertyOptional({
    type: ESortType,
    enum: Object.values(ESortType),
  })
  @IsOptional()
  @IsEnum(ESortType)
  @Expose()
  sortType: ESortType;
}
