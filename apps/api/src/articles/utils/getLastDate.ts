import { IArticle } from '../entities/article.entity';

export const getLastDate = (articles: IArticle[]) => {
  let lastDate = 0;

  articles.forEach(({ pubDate }) => {
    if (pubDate > lastDate) {
      lastDate = pubDate;
    }
  });

  return lastDate;
};
