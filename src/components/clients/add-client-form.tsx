"use client";

import { useActionState, useEffect, useRef } from "react";
import { addClient, type ClientFormState } from "@/app/dashboard/clients/actions";

const initialState: ClientFormState = {};

export function AddClientForm() {
  const [state, formAction, pending] = useActionState(
    addClient,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!pending && !state.error) {
      formRef.current?.reset();
    }
  }, [pending, state.error]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col gap-3 rounded-lg border border-ink-200 bg-white p-4 shadow-sm sm:flex-row sm:items-end"
    >
      <div className="flex-1">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-ink-700"
        >
          Client name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1 w-full rounded-md border border-ink-200 px-3 py-2 text-sm"
        />
      </div>
      <div className="flex-1">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-ink-700"
        >
          Email (optional)
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="mt-1 w-full rounded-md border border-ink-200 px-3 py-2 text-sm"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700 disabled:opacity-50"
      >
        {pending ? "Adding..." : "+ Invite client"}
      </button>
      {state.error && (
        <p className="text-sm text-danger sm:basis-full">{state.error}</p>
      )}
    </form>
  );
}
