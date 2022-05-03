import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ECensorshipStatus, EReleaseStatus } from '@src/common/enums';
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
export class CreateBookRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;

  @ApiProperty()
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

  @ApiProperty({
    enum: ECensorshipStatus,
    default: ECensorshipStatus.PENDING,
    examples: ECensorshipStatus,
  })
  @IsNotEmpty()
  @Expose()
  censorshipStatus: ECensorshipStatus;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  @Expose()
  isVisible: boolean;

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

  @ApiPropertyOptional({
    enum: ECensorshipStatus,
    default: ECensorshipStatus.PENDING,
    examples: ECensorshipStatus,
  })
  @Expose()
  censorshipStatus: ECensorshipStatus;

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
