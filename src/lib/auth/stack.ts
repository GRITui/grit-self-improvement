import { StackServerApp } from "@stackframe/stack";

// Neon Auth is Neon's first-party auth product (built on Stack Auth) --
// see https://neon.tech/docs/guides/neon-auth. Create it from the "Auth"
// tab on the Neon project (or a standalone project at
// https://app.stack-auth.com if not using Neon's integration), then copy
// its three keys into NEXT_PUBLIC_STACK_PROJECT_ID /
// NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY / STACK_SECRET_SERVER_KEY (see
// supabase/README.md). The SDK reads those env vars itself -- no need to
// pass them here explicitly.
//
// `tokenStore: "nextjs-cookie"` stores the session in httpOnly cookies via
// Next.js's cookies() API, the same role @supabase/ssr's cookie-based
// client played before this migration.
export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  urls: {
    signIn: "/login",
    signUp: "/signup",
    afterSignIn: "/dashboard",
    afterSignUp: "/dashboard",
    afterSignOut: "/login",
  },
});
