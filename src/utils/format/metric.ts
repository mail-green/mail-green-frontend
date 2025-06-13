export function formatMetricValue(value: number, metricLabel: string): string {
  if (metricLabel.includes("탄소")) {
    // g 단위, 1000g 이상이면 kg로 변환
    if (value >= 1000) {
      return `${(value / 1000).toLocaleString()}kg`;
    }
    return `${value.toLocaleString()}g`;
  }
  if (metricLabel.includes("전력")) {
    // kWh 단위
    return `${value.toLocaleString()}kWh`;
  }
  if (metricLabel.includes("메일")) {
    // 개수 단위
    return `${value.toLocaleString()}개`;
  }
  if (metricLabel.includes("연속 참여")) {
    // 주차 + 이모지
    return `${value}주 연속 ✨`;
  }
  // 기본: 숫자만
  return value.toLocaleString();
}
