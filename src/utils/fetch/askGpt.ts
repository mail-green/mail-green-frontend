import { postFetch } from "./fetch";
import type { ChatMessage } from "../../types/gptChat";

// 질문을 보내고, 답변(ChatMessage)을 받는 함수
export async function askGpt(
  prompt: string,
  userId: string
): Promise<ChatMessage> {
  const res = await postFetch<ChatMessage>("/ai/ask", {
    user_id: userId,
    prompt,
  });

  if (!res || typeof res !== "object" || !("ai_response" in res)) {
    // 실패 응답 처리
    return {
      id: "",
      role: "gpt",
      content: "AI 응답 파싱 실패",
      createdAt: new Date().toISOString(),
      functionName: undefined,
      result: null,
      error: "응답이 올바르지 않습니다.",
    };
  }

  const aiRes = res.ai_response as any;
  const contentArr = Array.isArray(aiRes?.content)
    ? aiRes.content
    : [aiRes?.content];

  const textObj = contentArr.find((c: any) => c?.type === "text");
  const toolObj = contentArr.find((c: any) => c?.type === "tool_use");

  return {
    id: aiRes?.id || "",
    role: "gpt",
    content: textObj?.text || "",
    createdAt: new Date().toISOString(),
    functionName: toolObj?.name,
    result: (res as any).result ?? null,
  };
}
