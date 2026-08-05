export type Client = {
  id: string;
  coach_id: string;
  name: string;
  email: string | null;
  invite_token: string;
  cadence: string;
  questions: string[];
  archived_at: string | null;
  created_at: string;
};

export type PublicCheckinClient = {
  id: string;
  name: string;
  cadence: string;
  questions: string[];
  is_active: boolean;
};
