import type { DefaultFilterType } from "../types/filter";

export const FILTER_OPTIONS: Record<DefaultFilterType, string[]> = {
  "읽음 상태": ["읽음", "읽지 않음"],
  크기: ["10MB 이상", "5MB 이상", "1MB 이상"],
  기간: ["1개월 전", "3개월 전", "6개월 전", "1년 전"],
};
