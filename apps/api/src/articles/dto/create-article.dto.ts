import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDateString()
  @IsNotEmpty()
  pubDate: Date;

  @IsString()
  @IsNotEmpty()
  content: string;
}
