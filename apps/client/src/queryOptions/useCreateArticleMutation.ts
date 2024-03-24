import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../main';
import { IArticle } from '../types/IArticle';
import axios, { AxiosError } from 'axios';
import { ITokenType } from '../types/ITokenType';

const createArticle = async (
  props: Partial<Omit<IArticle, 'pubDate' | 'id'>> & Partial<ITokenType>,
) => {
  const articleData = { ...props, pubDate: new Date().toISOString() };

  const { data } = await axios.post('/api/articles', articleData, {
    headers: {
      Authorization: `Bearer ${props.token}`,
    },
  });

  return data;
};

export const useCreateArticleMutation = (
  onSuccess: () => void,
  onError: (error: AxiosError) => unknown,
) => {
  return useMutation({
    mutationKey: ['articles', 'create'],
    mutationFn: createArticle,
    onSuccess: () => {
      queryClient.invalidateQueries();
      onSuccess();
    },
    onError,
  });
};
