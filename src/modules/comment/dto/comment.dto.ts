import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class CommentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;
}
