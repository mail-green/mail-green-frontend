import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unsubscribe } from "../../api/subscription";

export function useUnsubscribe(userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: unsubscribe,
    onSuccess: () => {
      queryClient.invalidateQueries(["subscriptions", userId]);
    },
  });
}
