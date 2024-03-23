import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article {
  @Prop({
    type: String,
    required: true,
  })
  title: string;
  @Prop({
    type: Number,
    required: true,
  })
  pubDate: number;
  @Prop({
    type: String,
    required: true,
  })
  content: string;

  @Prop({
    type: Boolean,
    required: true,
  })
  isFetched: boolean;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
