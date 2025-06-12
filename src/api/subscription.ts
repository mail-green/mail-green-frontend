import type { Subscription } from "../types/subscription";
import { getFetch, postFetch } from "../utils/fetch/fetch";

export async function fetchSubscriptions(
  userId: string
): Promise<Subscription[]> {
  return await getFetch(`/subscriptions`, { user_id: userId });
}

export async function unsubscribe(sub_id: string): Promise<void> {
  await postFetch(`/subscriptions/${sub_id}/unsubscribe`);
}
