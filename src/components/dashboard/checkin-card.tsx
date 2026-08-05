"use client";

import { useActionState, useState } from "react";
import {
  saveCoachReply,
  type ReplyFormState,
} from "@/app/dashboard/clients/[id]/actions";
import { RiskBadge } from "@/components/dashboard/risk-badge";
import type { Checkin } from "@/lib/types";

const initialState: ReplyFormState = {};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function CheckinCard({
  checkin,
  clientId,
  defaultExpanded,
}: {
  checkin: Checkin;
  clientId: string;
  defaultExpanded: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const boundSave = saveCoachReply.bind(null, clientId);
  const [state, formAction, pending] = useActionState(
    boundSave,
    initialState
  );
  const [reply, setReply] = useState(
    checkin.coach_reply ?? checkin.draft_reply ?? ""
  );

  if (!expanded) {
    return (
      <button
        type="button"
        onClick={() => setExpanded(true)}
        className="flex w-full items-center justify-between rounded-lg border border-ink-200 bg-white p-4 text-left shadow-sm hover:bg-ink-50"
      >
        <span className="text-sm font-medium text-ink-800">
          Week of {formatDate(checkin.created_at)}
        </span>
        <div className="flex items-center gap-3">
          <RiskBadge risk={checkin.risk_level} />
          <span className="text-ink-400">&gt;</span>
        </div>
      </button>
    );
  }

  return (
    <div className="rounded-lg border border-ink-200 bg-white p-4 shadow-sm sm:p-6">
      <button
        type="button"
        onClick={() => setExpanded(false)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-sm font-medium text-ink-800">
          Week of {formatDate(checkin.created_at)}
        </span>
        <RiskBadge risk={checkin.risk_level} />
      </button>

      <div className="mt-4 flex flex-col gap-3">
        <p className="text-xs font-medium tracking-wide text-ink-500 uppercase">
          Client responses
        </p>
        {checkin.answers.map((qa, index) => (
          <div key={index}>
            <p className="text-sm font-medium text-ink-700">{qa.question}</p>
            <p className="mt-1 text-sm text-ink-600">{qa.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-ink-200 pt-4">
        {checkin.ai_summary ? (
          <>
            <p className="text-xs font-medium tracking-wide text-ink-500 uppercase">
              AI summary
            </p>
            <p className="mt-1 text-sm text-ink-700">{checkin.ai_summary}</p>
          </>
        ) : (
          <p className="text-sm text-ink-400 italic">
            AI analysis isn&apos;t available for this check-in.
          </p>
        )}
      </div>

      <form action={formAction} className="mt-4 flex flex-col gap-2">
        <input type="hidden" name="checkinId" value={checkin.id} />
        <label
          htmlFor={`reply-${checkin.id}`}
          className="text-xs font-medium tracking-wide text-ink-500 uppercase"
        >
          Suggested reply
        </label>
        <textarea
          id={`reply-${checkin.id}`}
          name="reply"
          rows={4}
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          className="w-full rounded-md border border-ink-200 px-3 py-2 text-sm"
        />
        <p className="text-xs text-ink-400">
          Saved here for your records — send it to your client through your
          usual channel (email, text, etc).
        </p>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={pending || !reply.trim()}
            className="rounded-md bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
          >
            {pending ? "Saving..." : "Save reply"}
          </button>
          <button
            type="button"
            onClick={() => setReply("")}
            className="rounded-md border border-ink-200 px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50"
          >
            Discard
          </button>
        </div>
        {checkin.reply_sent_at && (
          <p className="text-xs text-ink-400">
            Last saved {formatDate(checkin.reply_sent_at)}
          </p>
        )}
        {state.error && <p className="text-sm text-danger">{state.error}</p>}
      </form>
    </div>
  );
}
