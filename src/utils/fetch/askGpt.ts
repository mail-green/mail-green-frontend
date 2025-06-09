import { postFetch } from "./fetch";
import type {
  ChatMessage,
  GptFunctionName,
  GptApiResult,
} from "../../types/gptChat";

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

  const aiRes = res.ai_response as Record<string, unknown> & {
    content?: unknown;
  };
  const contentArr: Array<{ type: string; text?: string; name?: string }> =
    Array.isArray(aiRes?.content)
      ? (aiRes.content as Array<{ type: string; text?: string; name?: string }>)
      : aiRes.content
      ? [aiRes.content as { type: string; text?: string; name?: string }]
      : [];

  const textObj = contentArr.find((c) => c?.type === "text");
  const toolObj = contentArr.find((c) => c?.type === "tool_use");

  // functionName이 명확히 없으면 result도 null로
  const functionName = toolObj?.name as GptFunctionName | undefined;
  let result: GptApiResult = null;
  if (functionName && "result" in res) {
    result = (res as { result?: GptApiResult }).result ?? null;
  }

  return {
    id: typeof aiRes.id === "string" ? aiRes.id : "",
    role: "gpt",
    content: textObj?.text || "",
    createdAt: new Date().toISOString(),
    functionName,
    result,
  };
}
