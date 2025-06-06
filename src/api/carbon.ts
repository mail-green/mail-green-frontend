import { getFetch } from "../utils/fetch/fetch";
import type { CarbonApiResponse } from "../types/carbonCarousel";

export function getCarbonInfo(userId: string) {
  return getFetch<CarbonApiResponse>("/carbon", { user_id: userId });
}
