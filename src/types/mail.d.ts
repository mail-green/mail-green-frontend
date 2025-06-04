export interface Mail {
  name: string;
  title: string;
  from: string;
  to: string;
  date: string;
  content: string;
}

export type RawMail = {
  id: string;
  subject: string;
  snippet: string;
  received_at: string;
  is_read: boolean;
};
