// 기간
// 읽음 여부
// 크기

export type DefaultFilterType = "읽음 상태" | "크기" | "기간";

export type Filter = {
  type: DefaultFilterType;
  option: ReadFilterType | SizeFilterType | PeriodFilterType | null;
};

export type ReadFilterType = "읽음 상태" | "읽음" | "읽지 않음";
export type SizeFilterType = "크기" | "10MB 이상" | "5MB 이상" | "1MB 이상";
export type PeriodFilterType =
  | "기간"
  | "1개월 전"
  | "3개월 전"
  | "6개월 전"
  | "1년 전";

export type FilterList = Filter[];
