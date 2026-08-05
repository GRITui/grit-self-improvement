import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-zinc-50 px-6 text-center dark:bg-black">
      <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        FollowThru
      </h1>
      <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
        An AI accountability copilot for coaches. Marketing page coming soon —
        for now, sign in to your coach dashboard.
      </p>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          Log in
        </Link>
        <Link
          href="/signup"
          className="rounded-full border border-zinc-300 px-5 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
