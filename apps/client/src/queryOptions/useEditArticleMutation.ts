import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../main';
import { IArticle } from '../types/IArticle';
import axios, { AxiosError } from 'axios';
import { ITokenType } from '../types/ITokenType';

const editArticle = async (
  props: Partial<Omit<IArticle, 'pubDate'>> & Partial<ITokenType>,
) => {
  const articleData = { ...props, id: undefined };

  const { data } = await axios.patch(`/api/articles/${props.id}`, articleData, {
    headers: {
      Authorization: `Bearer ${props.token}`,
    },
  });

  return data;
};

export const useEditArticleMutation = (
  onSuccess: () => void,
  onError: (error: AxiosError) => unknown,
) => {
  return useMutation({
    mutationKey: ['articles', 'edit'],
    mutationFn: editArticle,
    onSuccess: () => {
      queryClient.invalidateQueries();
      onSuccess();
    },
    onError,
  });
};
