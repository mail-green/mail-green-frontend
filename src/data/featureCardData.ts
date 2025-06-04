import type { FeatureCardData } from "../components/home/feature/FeatureCard";

export type CardType = "ai" | "keyword" | "sender" | "gpt";

export const featureCardList: FeatureCardData[] = [
  {
    bgColor: "rgba(143, 214, 148, 0.1)",
    textColor: "#8FD694",
    title: "이런 발신자에게 가장 많이 왔어요!",
    description: "가장 많이 온 발신자를 확인해보세요!",
    buttonText: "발신자별로 정리하러 가기",
    url: "/recommend/sender",
    type: "sender",
  },
  {
    bgColor: "rgba(143, 214, 148, 0.1)",
    textColor: "#8FD694",
    title: "이런 키워드가 가장 많이 왔어요!",
    description: "가장 많이 온 키워드를 확인해보세요!",
    buttonText: "키워드로 정리하러 가기",
    url: "/recommend/keyword",
    type: "keyword",
  },
  {
    bgColor: "rgba(167, 203, 255, 0.1)", // 10% 투명도
    textColor: "#A7CBFF",
    title: "AI로 정리하기",
    description: "삭제 기록을 바탕으로\nAI로 정리해보세요!",
    buttonText: "AI로 정리하러 가기",
    url: "/recommend/ai",
    type: "ai",
  },
  {
    bgColor: "rgba(167, 203, 255, 0.1)",
    textColor: "#A7CBFF",
    title: "GPT로 정리하기",
    description: "대화로 메일을 정리해보세요!",
    buttonText: "GPT로 정리하러 가기",
    url: "/recommend/gpt",
    type: "gpt",
  },
];
