import { HttpException, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ConfigService } from '@nestjs/config';
import * as Parser from 'rss-parser';
import { getLastDate } from './utils/getLastDate';
import { IArticle } from './entities/article.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './schemas/article.schema';
import { Model } from 'mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GetArticleDto } from './dto/get-article.dto';
import { Types } from 'mongoose';
import { IGetAllParams } from './entities/findAll.params';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
    private configService: ConfigService,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const newArticle = new this.articleModel({
      ...createArticleDto,
      pubDate: new Date(createArticleDto.pubDate).getTime(),
      isFetched: false,
    });

    await newArticle.save();

    return { ...new GetArticleDto(newArticle) };
  }

  async update(id: Types.ObjectId, updateArticleDto: UpdateArticleDto) {
    const foundArticle = await this.articleModel.findByIdAndUpdate(id, {
      ...updateArticleDto,
      pubDate: new Date(updateArticleDto.pubDate).getTime(),
    });

    if (!foundArticle) {
      throw new HttpException('No article found', 404);
    }

    return { ...new GetArticleDto(foundArticle) };
  }

  async remove(id: Types.ObjectId) {
    const removedArticle = await this.articleModel.findByIdAndDelete(id);

    if (!removedArticle) {
      throw new HttpException('No article found', 404);
    }

    return { ...new GetArticleDto(removedArticle) };
  }

  async findAll(params: IGetAllParams) {
    const { skip, limit, searchStr, sort, isDesc } = params;

    const titleFilter = searchStr && { title: new RegExp(searchStr, 'i') };

    const totalCount = await this.articleModel
      .find(titleFilter)
      .countDocuments();

    const articles = await this.articleModel
      .find(titleFilter)
      .sort({ [sort]: isDesc ? -1 : 1 })
      .skip(skip)
      .limit(limit);
    return {
      data: articles.map((el) => ({ ...new GetArticleDto(el) })),
      totalCount,
      ...params,
    };
  }

  async findOne(id: Types.ObjectId) {
    const article = await this.articleModel.findById(id);

    if (!article) {
      throw new HttpException('No article found', 404);
    }
    return { ...new GetArticleDto(article) };
  }

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  async parseNew() {
    const parser = new Parser({});
    const url = this.configService.get('rssFeedUrl');
    const { items } = await parser.parseURL(url);
    const parsedItems: IArticle[] = items.map(({ title, pubDate, ...rest }) => {
      return {
        title,
        pubDate: new Date(pubDate).getTime(),
        content: rest['content:encoded'] || rest.content,
        isFetched: true,
      };
    });
    const lastFetchedPublishDate = getLastDate(parsedItems);
    const lastDB = await this.articleModel
      .find({ isFetched: true })
      .sort({ age: -1 })
      .limit(1);
    const lastDBPublishDate = lastDB.length ? lastDB[0].pubDate : 0;
    if (lastFetchedPublishDate > lastDBPublishDate) {
      await this.articleModel.insertMany(parsedItems);
    }
  }
}
