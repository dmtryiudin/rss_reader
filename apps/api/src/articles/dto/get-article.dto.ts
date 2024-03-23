import { ArticleDocument } from '../schemas/article.schema';
import { Types } from 'mongoose';

export class GetArticleDto {
  title: string;
  pubDate: number;
  content: string;
  isFetched: boolean;
  id: Types.ObjectId;

  constructor({ _id, title, pubDate, content, isFetched }: ArticleDocument) {
    this.id = _id;
    this.title = title;
    this.pubDate = pubDate;
    this.content = content;
    this.isFetched = isFetched;
  }
}
