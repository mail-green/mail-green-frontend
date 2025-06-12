import { useQuery } from "@tanstack/react-query";
import { fetchSubscriptions } from "../../api/subscription";

export function useSubscriptions(userId: string) {
  return useQuery({
    queryKey: ["subscriptions", userId],
    queryFn: () => fetchSubscriptions(userId),
  });
}
