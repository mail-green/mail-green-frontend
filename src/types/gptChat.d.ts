// GPT 채팅 메시지 타입
type ChatRole = "user" | "gpt";

// functionName은 실제로 아래와 같이 들어옴
export type GptFunctionName =
  | "search_mail"
  | "mark_important"
  | "read_mail"
  | "delete_mail"
  | "unsubscribe_mail";

export interface ChatMessage {
  id: string; // uuid 등
  role: ChatRole;
  content: string;
  createdAt: string; // ISO
  // functionName, result 등은 gpt 답변에만 존재
  functionName?: GptFunctionName;
  result?: GptApiResult;
  error?: string;
}

// /ai/ask API function별 result 타입
export type GptApiResult =
  | MarkImportantResult
  | ReadMailResult
  | DeleteMailResult
  | SearchMailResult
  | UnsubscribeMailResult
  | null;

export interface MarkImportantResult {
  starred: string[];
  count: number;
  starred_mails: GptMail[];
}
export interface ReadMailResult {
  read: string[];
  count: number;
}
export interface DeleteMailResult {
  deleted: string[];
  count: number;
}
export type SearchMailResult = GptMail[];
export interface UnsubscribeMailResult {
  unsubscribed: (GptMail & { unsub_url: string })[];
  failed: { id: string; error: string }[];
  count: number;
}

export interface GptMail {
  id: string;
  subject: string;
  sender: string;
  snippet: string;
  received_at: string;
  is_read: boolean;
  is_starred: boolean;
}
