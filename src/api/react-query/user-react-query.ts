import { useQuery } from "@tanstack/react-query";
import { userApi } from "../userApi";

export function useGetCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => userApi.getCurrentUser(),
    retry: 0,
  });
}
