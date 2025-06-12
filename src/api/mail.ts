// 메일 관련 API
// 1. 메일 삭제 관련부터

import type { MailDeleteRequest, MailDeleteResponse } from "./types/mail";
import { deleteFetch } from "../utils/fetch/fetch";

export function deleteMail(
  userId: string,
  messageIds: string[],
  confirm: boolean
) {
  return deleteFetch<MailDeleteResponse, MailDeleteRequest>(
    `/mail/trash?user_id=${userId}`,
    {
      message_ids: messageIds,
      confirm,
      delete_protected_sender: false,
    }
  );
}
