// 카드 데이터 배열 (별도 컴포넌트로 분리)
const cardData = [
  {
    text: "메일 삭제로 탄소를 4g\n감소시킬 수 있어요!",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
        <path
          d="M28 20C28 11.1634 20.8366 4 12 4H4v8c0 8.8366 7.1634 16 16 16h8v-8z"
          stroke="#6B7280"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    text: "메일 정리로\n받은 편지함이 쾌적해져요!",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="14" stroke="#A7CBFF" strokeWidth="2" />
      </svg>
    ),
  },
  {
    text: "AI가 추천하는\n중요 메일만 남길 수 있어요!",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
        <rect
          x="6"
          y="6"
          width="20"
          height="20"
          rx="5"
          stroke="#EF4444"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    text: "불필요한 메일을\n한 번에 정리할 수 있어요!",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
        <path
          d="M8 16h16"
          stroke="#8FD694"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default cardData;