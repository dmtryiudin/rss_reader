import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";
import axios, { AxiosError } from "axios";
import { IAuthType } from "../types/IAuthType";
import { ISession } from "../types/ISession";

const login = async ({ username, password }: IAuthType) => {
  const { data } = await axios.post<ISession>("/api/auth/login", {
    username,
    password,
  });

  return data;
};

export const useLoginMutation = (onError: (error: AxiosError) => unknown) => {
  return useMutation({
    mutationFn: login,
    onSuccess: () => queryClient.invalidateQueries(),
    onError,
  });
};
