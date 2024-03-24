import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { IGetAllParams } from './entities/findAll.params';
import { ApiQuery } from '@nestjs/swagger';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async create(@Body() createArticleDto: CreateArticleDto) {
    return await this.articlesService.create(createArticleDto);
  }

  @Get()
  @ApiQuery({ name: 'limit', type: 'number' })
  @ApiQuery({ name: 'skip', type: 'number' })
  @ApiQuery({ name: 'searchStr', type: 'string' })
  @ApiQuery({ name: 'sort', type: 'string' })
  @ApiQuery({ name: 'isDesc', type: 'boolean' })
  async findAll(@Query() query: IGetAllParams) {
    return await this.articlesService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: Types.ObjectId) {
    return await this.articlesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async update(
    @Param('id') id: Types.ObjectId,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return await this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: Types.ObjectId) {
    return await this.articlesService.remove(id);
  }
}
