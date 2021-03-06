import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EReleaseStatus } from '@src/common/enums';
import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

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

  @Expose()
  @ApiProperty({ type: () => [CreateChapterRequestDto] })
  @IsArray()
  @Expose()
  chapters: CreateChapterRequestDto[];
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
