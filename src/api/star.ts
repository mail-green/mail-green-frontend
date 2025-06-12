// 중요 메일 등록/해제

import { postFetch, deleteFetch } from "../utils/fetch/fetch";

export function starMail(userId: string, messageId: string) {
  return postFetch(`/mail/${messageId}/star?user_id=${userId}`);
}

export function unstarMail(userId: string, messageId: string) {
  return deleteFetch(`/mail/${messageId}/star?user_id=${userId}`);
}
