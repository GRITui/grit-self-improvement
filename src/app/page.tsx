import Link from "next/link";
import { PLAN_TIERS } from "@/lib/billing";

const STEPS = [
  {
    title: "Set up a client program",
    body: "Add a client, set their check-in cadence, and write up to 5 questions — or use the defaults.",
  },
  {
    title: "Client checks in, zero friction",
    body: "They answer via a tokenized link. No app install, no account, no password to forget.",
  },
  {
    title: "Claude triages it for you",
    body: "Every response is summarized, flagged for disengagement risk, and given a drafted reply you edit and send.",
  },
];

const FEATURES = [
  {
    title: "AI summary, every check-in",
    body: "Stop re-reading long free-text answers. Get the two-sentence version the moment it comes in.",
  },
  {
    title: "Disengagement risk flags",
    body: "Terse answers and slipping streaks get flagged Low/Medium/High so you catch clients going quiet before they churn.",
  },
  {
    title: "Drafted replies, never auto-sent",
    body: "Claude drafts a reply for you to review and edit. You always click send — nothing goes out on your behalf.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-ink-50">
      <header className="border-b border-ink-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <span className="text-lg font-semibold text-ink-800">
            FollowThru
          </span>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-ink-700 hover:text-ink-900"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700"
            >
              Start free trial
            </Link>
          </div>
        </div>
      </header>

      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h1 className="text-4xl font-bold tracking-tight text-ink-800 sm:text-5xl">
            An AI accountability copilot for coaches
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-600">
            FollowThru summarizes every client check-in, flags who&apos;s
            going quiet before they churn, and drafts your reply — so you
            spend less time reading and replying, and more time coaching.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="rounded-md bg-brand-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-brand-700"
            >
              Start your 14-day free trial
            </Link>
            <Link
              href="/login"
              className="rounded-md border border-ink-200 bg-white px-6 py-3 text-base font-medium text-ink-700 transition-colors hover:bg-ink-50"
            >
              Log in
            </Link>
          </div>
          <p className="mt-3 text-sm text-ink-500">
            No credit card required to start.
          </p>
        </div>
      </section>

      <section className="border-y border-ink-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-xl font-semibold text-ink-800">
            How it works
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {STEPS.map((step, index) => (
              <div key={step.title}>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <h3 className="mt-4 text-lg font-medium text-ink-800">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-ink-600">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-xl font-semibold text-ink-800">
            Built for coaches who want their time back
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg border border-ink-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-medium text-ink-800">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-ink-600">{feature.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-ink-800">
              Simple pricing, flat by client count
            </h2>
            <p className="mt-2 text-sm text-ink-500">
              No per-seat penalties. 14-day free trial on every plan.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {PLAN_TIERS.map((tier) => (
              <div
                key={tier.id}
                className="flex flex-col rounded-lg border border-ink-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-medium text-ink-800">
                  {tier.name}
                </h3>
                <p className="mt-2 text-3xl font-bold text-ink-800">
                  {tier.priceLabel}
                </p>
                <p className="mt-2 text-sm text-ink-600">
                  {tier.clientLimit === Infinity
                    ? "Unlimited active clients"
                    : `Up to ${tier.clientLimit} active clients`}
                </p>
                <Link
                  href="/signup"
                  className="mt-6 rounded-md border border-ink-200 px-4 py-2 text-center text-sm font-medium text-ink-700 transition-colors hover:bg-ink-50"
                >
                  Start free trial
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="text-2xl font-semibold text-ink-800">
            Stop letting clients go quiet on you
          </h2>
          <Link
            href="/signup"
            className="mt-6 rounded-md bg-brand-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-brand-700"
          >
            Start your 14-day free trial
          </Link>
        </div>
      </section>

      <footer className="border-t border-ink-200 px-6 py-8">
        <div className="mx-auto max-w-7xl text-center text-sm text-ink-500">
          &copy; {new Date().getFullYear()} FollowThru.
        </div>
      </footer>
    </div>
  );
}
