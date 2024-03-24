import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  pubDate: Date;

  @IsString()
  @IsOptional()
  @ApiProperty()
  content: string;
}
