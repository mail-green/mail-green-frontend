import type { FilterList } from "../../types/filter";

export function getFilterParams(
  userId: number,
  filterList: FilterList,
  debouncedKeyword: string
) {
  const params: Record<string, string | number | boolean> = {};
  filterList.forEach((filter) => {
    switch (filter.type) {
      case "읽음 상태":
        if (filter.option === "읽음") params.is_read = true;
        else if (filter.option === "읽지 않음") params.is_read = false;
        break;
      case "크기":
        if (filter.option === "10MB 이상") params.min_size_mb = 10;
        else if (filter.option === "5MB 이상") params.min_size_mb = 5;
        else if (filter.option === "1MB 이상") params.min_size_mb = 1;
        break;
      case "기간":
        if (filter.option === "1개월 전") params.older_than_months = 1;
        else if (filter.option === "3개월 전") params.older_than_months = 3;
        else if (filter.option === "6개월 전") params.older_than_months = 6;
        else if (filter.option === "1년 전") params.older_than_months = 12;
        break;
      default:
        break;
    }
  });
  if (debouncedKeyword) params.sender = debouncedKeyword;
  params.user_id = userId;
  // undefined 값 제거
  Object.keys(params).forEach((key) => {
    if (params[key] === undefined) {
      delete params[key];
    }
  });
  return params;
}
