import { StackHandler } from "@stackframe/stack";

// Required catch-all route for Neon Auth (Stack Auth): even though this
// app uses its own custom login/signup UI (see src/app/login,
// src/app/signup) rather than Stack's prebuilt pages, the SDK still routes
// OAuth callbacks, email verification links, and password-reset links
// through /handler/* internally. `fullPage` renders it without any extra
// chrome since none of those sub-pages are meant to be reached directly by
// a coach in normal use.
export default function Handler() {
  return <StackHandler fullPage />;
}
