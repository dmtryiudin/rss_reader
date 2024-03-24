import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { IArticle } from '../types/IArticle';
import { IGetAllArticlesParams } from '../types/IGetAllArticlesParams';
import { getQueryParams } from '../utils/getQueryParams';
import { IPaginationResponse } from '../types/IPaginationResponse';

const fetchArticles = async ({ page, ...params }: IGetAllArticlesParams) => {
  const { data } = await axios.get<IPaginationResponse<IArticle>>(
    `/api/articles${getQueryParams({ ...params, limit: 10, skip: (page - 1) * 10 })}`,
  );
  return data;
};

export const getAllArticlesOptions = (params: IGetAllArticlesParams) =>
  queryOptions({
    queryKey: ['articles', { params }],
    queryFn: () => fetchArticles({ ...params }),
  });
