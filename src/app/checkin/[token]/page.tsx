import { createPublicClient } from "@/lib/supabase/data";
import { CheckinForm } from "./checkin-form";
import type { PublicCheckinClient } from "@/lib/types";

type CheckinClient = PublicCheckinClient & { coach_name: string };

export default async function CheckinPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const supabase = createPublicClient();

  const { data } = await supabase.rpc("get_client_by_invite_token", {
    token,
  });

  const client = (data as CheckinClient[] | null)?.[0];

  if (!client || !client.is_active) {
    return (
      <div className="flex flex-1 items-center justify-center bg-ink-50 px-6">
        <div className="max-w-sm text-center">
          <h1 className="text-lg font-medium text-ink-800">
            This check-in link is no longer active
          </h1>
          <p className="mt-2 text-sm text-ink-500">
            Please contact your coach for a new link.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-ink-50 px-6 py-12">
      <div className="w-full max-w-[600px] rounded-lg border border-ink-200 bg-white p-6 shadow-sm sm:p-8">
        <CheckinForm
          token={token}
          coachName={client.coach_name}
          clientName={client.name}
          questions={client.questions}
        />
      </div>
      <p className="fixed bottom-4 text-center text-xs text-ink-400">
        Powered by FollowThru
      </p>
    </div>
  );
}
