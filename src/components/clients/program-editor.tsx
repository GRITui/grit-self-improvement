"use client";

import { useActionState, useState } from "react";
import {
  updateProgram,
  type ClientFormState,
} from "@/app/dashboard/clients/actions";
import type { Client } from "@/lib/types";

const CADENCE_OPTIONS = [
  { value: "weekly", label: "Weekly" },
  { value: "biweekly", label: "Every 2 weeks" },
  { value: "monthly", label: "Monthly" },
];

const initialState: ClientFormState = {};

export function ProgramEditor({
  client,
  onDone,
}: {
  client: Client;
  onDone: () => void;
}) {
  const [state, formAction, pending] = useActionState(
    updateProgram,
    initialState
  );
  const [cadence, setCadence] = useState(client.cadence);
  const [questions, setQuestions] = useState<string[]>(
    client.questions.length > 0 ? client.questions : [""]
  );

  function updateQuestion(index: number, value: string) {
    setQuestions((prev) => prev.map((q, i) => (i === index ? value : q)));
  }

  function addQuestion() {
    setQuestions((prev) => (prev.length < 5 ? [...prev, ""] : prev));
  }

  function removeQuestion(index: number) {
    setQuestions((prev) =>
      prev.length > 1 ? prev.filter((_, i) => i !== index) : prev
    );
  }

  function moveQuestion(index: number, direction: -1 | 1) {
    setQuestions((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  return (
    <li className="rounded-lg border border-ink-200 bg-white p-4 shadow-sm">
      <form
        action={async (formData) => {
          await formAction(formData);
          onDone();
        }}
        className="flex flex-col gap-4"
      >
        <input type="hidden" name="id" value={client.id} />
        <input
          type="hidden"
          name="questions"
          value={JSON.stringify(questions)}
        />

        <p className="text-sm font-medium text-ink-800">
          {client.name}&apos;s check-in program
        </p>

        <div>
          <label
            htmlFor={`cadence-${client.id}`}
            className="block text-sm font-medium text-ink-700"
          >
            Cadence
          </label>
          <select
            id={`cadence-${client.id}`}
            name="cadence"
            value={cadence}
            onChange={(e) => setCadence(e.target.value)}
            className="mt-1 w-full max-w-xs rounded-md border border-ink-200 px-3 py-2 text-sm"
          >
            {CADENCE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-ink-700">
              Questions ({questions.length}/5)
            </p>
            <button
              type="button"
              onClick={addQuestion}
              disabled={questions.length >= 5}
              className="text-xs font-medium text-brand-600 hover:text-brand-700 disabled:opacity-40"
            >
              + Add question
            </button>
          </div>
          <div className="mt-2 flex flex-col gap-2">
            {questions.map((question, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  required
                  value={question}
                  onChange={(e) => updateQuestion(index, e.target.value)}
                  className="flex-1 rounded-md border border-ink-200 px-3 py-2 text-sm"
                />
                <button
                  type="button"
                  onClick={() => moveQuestion(index, -1)}
                  disabled={index === 0}
                  aria-label="Move question up"
                  className="rounded-md border border-ink-200 px-2 py-2 text-xs text-ink-600 hover:bg-ink-50 disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveQuestion(index, 1)}
                  disabled={index === questions.length - 1}
                  aria-label="Move question down"
                  className="rounded-md border border-ink-200 px-2 py-2 text-xs text-ink-600 hover:bg-ink-50 disabled:opacity-30"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => removeQuestion(index)}
                  disabled={questions.length <= 1}
                  aria-label="Remove question"
                  className="rounded-md border border-ink-200 px-2 py-2 text-xs text-danger hover:bg-ink-50 disabled:opacity-30"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={pending}
            className="rounded-md bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
          >
            {pending ? "Saving..." : "Save program"}
          </button>
          <button
            type="button"
            onClick={onDone}
            className="rounded-md border border-ink-200 px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50"
          >
            Cancel
          </button>
        </div>

        {state.error && <p className="text-sm text-danger">{state.error}</p>}
      </form>
    </li>
  );
}
