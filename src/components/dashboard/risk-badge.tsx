const RISK_STYLES: Record<string, string> = {
  LOW: "bg-risk-low-bg text-risk-low",
  MEDIUM: "bg-risk-medium-bg text-risk-medium",
  HIGH: "bg-risk-high-bg text-risk-high",
};

const RISK_LABELS: Record<string, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
};

export function RiskBadge({ risk }: { risk: "LOW" | "MEDIUM" | "HIGH" | null }) {
  if (!risk) {
    return (
      <span className="inline-flex rounded-full bg-ink-100 px-2.5 py-1 text-xs font-medium text-ink-500">
        No check-ins yet
      </span>
    );
  }

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${RISK_STYLES[risk]}`}
    >
      {RISK_LABELS[risk]}
    </span>
  );
}
