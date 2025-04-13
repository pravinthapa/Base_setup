import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

export const useMutate = (
  queryKey,
  basePath,
  contentType = "application/json"
) => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  const mutation = useMutation({
    mutationFn: async (params) => {
      const requestData = {
        method: params?.[0],
        url: basePath + params?.[1],
        data: params?.[2],
        headers: {
          "Content-Type": contentType,
        },
      };
      const response = await axiosPrivate(requestData);
      return response?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey]);
    },
    onError: (error) => {
      return error?.response?.data;
    },
  });

  return mutation;
};

export const useLoginMutation = () => useMutate(["login"], `accounts/login/`);

export const useRegisterMutation = () =>
  useMutate(["register"], `accounts/register/`);

export const useCreateTicketMutation = () =>
  useMutate(["create-ticket"], `support/tickets/`, "multipart/form-data");

export const useTicketReplyMutation = () =>
  useMutate(["ticket-reply"], `support/tickets/`, "multipart/form-data");
