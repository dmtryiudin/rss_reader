import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateArticleDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsDateString()
  @IsOptional()
  pubDate: Date;

  @IsString()
  @IsOptional()
  content: string;
}
