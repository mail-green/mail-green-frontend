import { postFetch } from "./fetch";
import type {
  ChatMessage,
  GptFunctionName,
  GptApiResult,
  GptMail,
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

  // content 생성: delete_mail 등은 mail_infos가 있으면 요약 메시지로 대체
  let content = textObj?.text || "";
  if (
    functionName === "delete_mail" &&
    result &&
    typeof result === "object" &&
    result !== null &&
    "mail_infos" in result &&
    Array.isArray((result as { mail_infos?: GptMail[] }).mail_infos)
  ) {
    const mailInfos =
      (result as { mail_infos?: GptMail[]; count?: number }).mail_infos ?? [];
    const count =
      (result as { mail_infos?: GptMail[]; count?: number }).count ??
      mailInfos.length;
    if (mailInfos.length > 0) {
      const shown = mailInfos.slice(0, 3);
      const rest = mailInfos.length - 3;
      content =
        `${count}개의 메일이 성공적으로 삭제되었습니다.\n\n` +
        shown
          .map(
            (m) =>
              `- ${m.subject} (${m.sender}, ${
                m.received_at ? m.received_at.slice(0, 10) : ""
              })`
          )
          .join("\n");
      if (rest > 0) content += `\n외 ${rest}개`;
    } else {
      content = `${count}개의 메일이 성공적으로 삭제되었습니다.`;
    }
  }

  return {
    id: typeof aiRes.id === "string" ? aiRes.id : "",
    role: "gpt",
    content,
    createdAt: new Date().toISOString(),
    functionName,
    result,
  };
}
