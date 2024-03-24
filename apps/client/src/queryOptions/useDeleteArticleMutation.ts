import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { queryClient } from "../main";

const deleteArticle = async (props: { id?: string; token?: string }) => {
  const { data } = await axios.delete(`/api/articles/${props.id}`, {
    headers: {
      Authorization: `Bearer ${props.token}`,
    },
  });

  return data;
};

export const useDeleteArticleMutation = (
  onSuccess: () => void,
  onError: (error: AxiosError) => unknown
) => {
  return useMutation({
    mutationKey: ["articles", "delete"],
    mutationFn: deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries();
      onSuccess();
    },
    onError,
  });
};
