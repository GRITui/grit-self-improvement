# Supabase setup

1. Create a project at https://supabase.com.
2. Copy `.env.example` to `.env.local` and fill in the project's URL and anon
   key (Project Settings → API).
3. Run the SQL in `migrations/` against the project (SQL Editor, or
   `supabase db push` if using the Supabase CLI locally).
4. Enable the Google provider under Authentication → Providers, and add
   `<your-site-url>/auth/callback` as an authorized redirect URL (both in
   Supabase and in the Google Cloud OAuth client).
5. Under Authentication → URL Configuration, set the Site URL to match
   `NEXT_PUBLIC_SITE_URL`.
