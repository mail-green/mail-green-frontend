export type CarbonApiResponse = {
  week_carbon_saved_g: number;
  total_carbon_saved_g: number;
  week_energy_saved_kwh: number;
  total_energy_saved_kwh: number;
  week_deleted_count: number;
  total_deleted_count: number;
  consecutive_weeks: number;
};

export type CarbonCarouselData = {
  message: string;
  metricLabel: string;
  metricValue: string;
};
