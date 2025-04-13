import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";
import { useAuthStore } from "@/store/useAuthStore";

export const useQueryData = (
  key,
  path,
  params = "",
  enabled = true,
  token = false
) => {
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuthStore();

  return useQuery({
    queryKey: [key, params],
    queryFn: () =>
      axiosPrivate({
        url: path,
        method: "get",
        params: params,
        ...(token && {
          headers: {
            Apikey: `Token ${user?.user?.service}`,
          },
        }),
      }).then((res) => res?.data && res?.data),
    enabled,
  });
};

// Updated to fetch support tickets
export const useSupportTicketsData = (page = 1) =>
  useQueryData(["supportTickets", page], `/support/tickets/?page=${page}`);

export const useSupportTicketsCategoryData = () =>
  useQueryData(["supportTicketsCategory"], `/support/tickets/get_categories/`);

export const useSupportTicketsDetailData = (id) =>
  useQueryData(
    ["supportTicketsDetail", id],
    `support/tickets/${id}/get-ticket-reply/`,
    "",
    !!id,
    true
  );
