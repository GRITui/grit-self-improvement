"use client";

import { useActionState } from "react";
import { submitCheckin, type SubmitCheckinState } from "./actions";

const initialState: SubmitCheckinState = {};

export function CheckinForm({
  token,
  coachName,
  clientName,
  questions,
}: {
  token: string;
  coachName: string;
  clientName: string;
  questions: string[];
}) {
  const boundSubmit = submitCheckin.bind(null, token);
  const [state, formAction, pending] = useActionState(
    boundSubmit,
    initialState
  );

  if (state.success) {
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-risk-low-bg text-2xl text-risk-low">
          ✓
        </div>
        <h1 className="text-lg font-medium text-ink-800">
          Thanks, {clientName}!
        </h1>
        <p className="max-w-xs text-sm text-ink-500">
          Your check-in was sent to {coachName}. See you next time.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <input type="hidden" name="questions" value={JSON.stringify(questions)} />

      <div>
        <h1 className="text-lg font-medium text-ink-800">
          {coachName}&apos;s check-in
        </h1>
        <p className="mt-1 text-sm text-ink-500">
          Hi {clientName} — how did this week go?
        </p>
      </div>

      {questions.map((question, index) => (
        <div key={index}>
          <label
            htmlFor={`answer-${index}`}
            className="block text-base text-ink-800"
          >
            {index + 1}. {question}
          </label>
          <textarea
            id={`answer-${index}`}
            name={`answer-${index}`}
            required
            rows={3}
            className="mt-2 w-full rounded-md border border-ink-200 px-3 py-2 text-base"
          />
        </div>
      ))}

      {state.error && <p className="text-sm text-danger">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="min-h-11 w-full rounded-md bg-brand-600 px-4 py-3 text-base font-medium text-white transition-colors hover:bg-brand-700 disabled:opacity-50"
      >
        {pending ? "Submitting..." : "Submit Check-in"}
      </button>
    </form>
  );
}
