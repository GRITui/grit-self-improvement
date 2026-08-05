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

export type Coach = {
  id: string;
  email: string;
  plan: string;
  trial_ends_at: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  created_at: string;
};

export type CheckinAnswer = {
  question: string;
  answer: string;
};

export type Checkin = {
  id: string;
  client_id: string;
  answers: CheckinAnswer[];
  ai_summary: string | null;
  risk_level: "LOW" | "MEDIUM" | "HIGH" | null;
  draft_reply: string | null;
  ai_processed_at: string | null;
  coach_reply: string | null;
  reply_sent_at: string | null;
  created_at: string;
};

export type PublicCheckinClient = {
  id: string;
  name: string;
  cadence: string;
  questions: string[];
  is_active: boolean;
};
