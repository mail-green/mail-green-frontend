export interface MailDeleteRequest {
  message_ids: string[];
  confirm: boolean;
  delete_protected_sender: boolean;
}

export interface MailDeleteResponse {
  deleted: boolean;
  estimated_carbon_saved_g: number;
  deleted_ids: string[];
  protected_ids: string[];
  protected_senders: string[];
  errors: string[];
}
