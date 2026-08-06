import { NextResponse, type NextRequest } from "next/server";
import { stackServerApp } from "@/lib/auth/stack";

const PROTECTED_PREFIXES = ["/dashboard"];

// Fast-path route guard, mirroring the old src/lib/supabase/middleware.ts.
// stackServerApp reads its session via `tokenStore: "nextjs-cookie"`,
// which per Stack Auth's docs works from Next.js middleware the same way
// @supabase/ssr's cookie-aware client did -- unverified against a live
// Neon Auth project (no credentials available in this environment; see
// PR description). src/app/dashboard/layout.tsx enforces the same check
// again server-side as a backstop, so a coach can't reach dashboard data
// even if this middleware check ever doesn't fire as documented.
export async function updateSession(request: NextRequest) {
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    request.nextUrl.pathname.startsWith(prefix)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const user = await stackServerApp.getUser();

  if (!user) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}
