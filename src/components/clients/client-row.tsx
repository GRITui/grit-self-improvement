"use client";

import { useActionState, useState } from "react";
import {
  removeClient,
  updateClient,
  type ClientFormState,
} from "@/app/dashboard/clients/actions";
import { ProgramEditor } from "@/components/clients/program-editor";
import type { Client } from "@/lib/types";

const initialState: ClientFormState = {};

export function ClientRow({
  client,
  checkinBaseUrl,
}: {
  client: Client;
  checkinBaseUrl: string;
}) {
  const [editing, setEditing] = useState(false);
  const [configuringProgram, setConfiguringProgram] = useState(false);
  const [confirmingRemove, setConfirmingRemove] = useState(false);
  const [copied, setCopied] = useState(false);
  const [state, formAction, pending] = useActionState(
    updateClient,
    initialState
  );

  const inviteLink = `${checkinBaseUrl}/checkin/${client.invite_token}`;

  if (configuringProgram) {
    return (
      <ProgramEditor
        client={client}
        onDone={() => setConfiguringProgram(false)}
      />
    );
  }

  async function copyInviteLink() {
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (editing) {
    return (
      <li className="rounded-lg border border-ink-200 bg-white p-4 shadow-sm">
        <form
          action={async (formData) => {
            await formAction(formData);
            setEditing(false);
          }}
          className="flex flex-col gap-3 sm:flex-row sm:items-end"
        >
          <input type="hidden" name="id" value={client.id} />
          <div className="flex-1">
            <label className="block text-sm font-medium text-ink-700">
              Client name
            </label>
            <input
              name="name"
              type="text"
              required
              defaultValue={client.name}
              className="mt-1 w-full rounded-md border border-ink-200 px-3 py-2 text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-ink-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              defaultValue={client.email ?? ""}
              className="mt-1 w-full rounded-md border border-ink-200 px-3 py-2 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={pending}
              className="rounded-md bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
            >
              {pending ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="rounded-md border border-ink-200 px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50"
            >
              Cancel
            </button>
          </div>
          {state.error && (
            <p className="text-sm text-danger sm:basis-full">
              {state.error}
            </p>
          )}
        </form>
      </li>
    );
  }

  return (
    <li className="flex flex-col gap-3 rounded-lg border border-ink-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-base font-medium text-ink-800">{client.name}</p>
        {client.email && (
          <p className="text-sm text-ink-500">{client.email}</p>
        )}
        <div className="mt-2 flex items-center gap-2">
          <code className="rounded bg-ink-100 px-2 py-1 text-xs text-ink-600">
            {inviteLink}
          </code>
          <button
            type="button"
            onClick={copyInviteLink}
            className="text-xs font-medium text-brand-600 hover:text-brand-700"
          >
            {copied ? "Copied!" : "Copy link"}
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="rounded-md border border-ink-200 px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => setConfiguringProgram(true)}
          className="rounded-md border border-ink-200 px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50"
        >
          Check-in program
        </button>
        {confirmingRemove ? (
          <form action={removeClient}>
            <input type="hidden" name="id" value={client.id} />
            <button
              type="submit"
              className="rounded-md bg-danger px-3 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              Confirm remove
            </button>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmingRemove(true)}
            className="rounded-md border border-ink-200 px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50"
          >
            Remove
          </button>
        )}
      </div>
    </li>
  );
}
