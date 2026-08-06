"use client";

import { useState } from "react";
import Link from "next/link";
import { useStackApp } from "@stackframe/stack";
import { GoogleButton } from "@/components/auth/google-button";
import type { AuthFormState } from "@/lib/auth/types";

const initialState: AuthFormState = {};

export default function SignupPage() {
  const app = useStackApp();
  const [state, setState] = useState<AuthFormState>(initialState);
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    if (password.length < 8) {
      setState({ error: "Password must be at least 8 characters." });
      return;
    }

    setPending(true);
    setState({});

    try {
      // Unlike Supabase (which blocked login until the confirmation link
      // was clicked), Stack Auth signs the coach in immediately on
      // successful signup and navigates to urls.afterSignUp itself (see
      // src/lib/auth/stack.ts) -- matching Stack Auth's own built-in
      // sign-up component. Whether email verification is additionally
      // required is a Neon Auth / Stack Auth project setting, not
      // something this form needs to branch on.
      const result = await app.signUpWithCredential({ email, password });
      if (result.status === "error") {
        setState({ error: result.error.message });
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-6 dark:bg-black">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Create your FollowThru account
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Start your 14-day free trial.
          </p>
        </div>

        <GoogleButton />

        <div className="flex items-center gap-3 text-xs text-zinc-400">
          <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
          or
          <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
        </div>

        <form action={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            />
            <p className="mt-1 text-xs text-zinc-500">
              At least 8 characters.
            </p>
          </div>

          {state.error && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            {pending ? "Signing up..." : "Sign up"}
          </button>
        </form>

        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account?{" "}
          <Link href="/login" className="font-medium underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
