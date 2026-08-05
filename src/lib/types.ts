export type Client = {
  id: string;
  coach_id: string;
  name: string;
  email: string | null;
  invite_token: string;
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
