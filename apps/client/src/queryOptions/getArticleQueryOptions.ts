import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { IArticle } from '../types/IArticle';

const fetchArticleById = async (articleId: string) => {
  const { data } = await axios.get<IArticle>(`/api/articles/${articleId}`);
  return data;
};

export const getArticleQueryOptions = (articleId: string) =>
  queryOptions({
    queryKey: ['articles', articleId],
    queryFn: () => fetchArticleById(articleId),
  });
