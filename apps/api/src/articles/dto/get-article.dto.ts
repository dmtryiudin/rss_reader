import { ArticleDocument } from '../schemas/article.schema';
import { Types } from 'mongoose';

export class GetArticleDto {
  title: string;
  pubDate: number;
  content: string;
  id: Types.ObjectId;

  constructor({ _id, title, pubDate, content }: ArticleDocument) {
    this.id = _id;
    this.title = title;
    this.pubDate = pubDate;
    this.content = content;
  }
}
