export type Client = {
  id: string;
  coach_id: string;
  name: string;
  email: string | null;
  invite_token: string;
  archived_at: string | null;
  created_at: string;
};
