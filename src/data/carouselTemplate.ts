import type { CarbonCarouselData } from "../types/carbonCarousel";

export type CarbonCarouselKey =
  | "week_carbon_saved_g"
  | "total_carbon_saved_g"
  | "week_energy_saved_kwh"
  | "total_energy_saved_kwh"
  | "week_deleted_count"
  | "total_deleted_count"
  | "consecutive_weeks";

export type CarbonCarouselTemplate = {
  [key in CarbonCarouselKey]: CarbonCarouselData;
};

export const CAROUSEL_TEMPLATE: CarbonCarouselTemplate = {
  week_carbon_saved_g: {
    message: "이번 주에 절감한 탄소량이에요!\n작은 실천이 큰 변화를 만듭니다.",
    metricLabel: "이번 주 탄소 절감",
    metricValue: `0g`,
  },
  total_carbon_saved_g: {
    message: "누적된 탄소 절감량이에요!\n지구가 더 푸르러졌어요.",
    metricLabel: "누적 탄소 절감",
    metricValue: `0g`,
  },
  week_energy_saved_kwh: {
    message: "이번 주에 절약한 전력이에요!\n작은 절약이 모여 큰 힘이 돼요.",
    metricLabel: "이번 주 전력 절약",
    metricValue: `0kWh`,
  },
  total_energy_saved_kwh: {
    message: "누적 전력 절약량이에요!\n환경 보호에 동참해주셔서 감사해요.",
    metricLabel: "누적 전력 절약",
    metricValue: `0kWh`,
  },
  week_deleted_count: {
    message: "이번 주에 정리한 메일 수에요!\n메일함이 더 가벼워졌어요.",
    metricLabel: "이번 주 정리 메일",
    metricValue: `0개`,
  },
  total_deleted_count: {
    message: "누적 정리한 메일 수에요!\n정리 습관이 멋져요.",
    metricLabel: "누적 정리 메일",
    metricValue: `0개`,
  },
  consecutive_weeks: {
    message: "연속으로 실천한 주차에요!\n꾸준함이 가장 큰 힘이에요.",
    metricLabel: "연속 참여",
    metricValue: `0주 연속 ✨`,
  },
};
