const CADENCE_PERIOD_DAYS: Record<string, number> = {
  weekly: 7,
  biweekly: 14,
  monthly: 30,
};

const DAY_MS = 24 * 60 * 60 * 1000;

// Consecutive check-ins count as a streak as long as the gap between them
// doesn't exceed 1.5x the client's cadence period (some slack for a
// check-in landing a day or two late without breaking the streak).
export function computeStreak(cadence: string, checkinDatesDesc: Date[]): number {
  if (checkinDatesDesc.length === 0) return 0;

  const periodDays = CADENCE_PERIOD_DAYS[cadence] ?? CADENCE_PERIOD_DAYS.weekly;
  const maxGapDays = periodDays * 1.5;

  let streak = 1;
  for (let i = 1; i < checkinDatesDesc.length; i++) {
    const gapDays =
      (checkinDatesDesc[i - 1].getTime() - checkinDatesDesc[i].getTime()) / DAY_MS;
    if (gapDays > maxGapDays) break;
    streak++;
  }
  return streak;
}

export function daysAgo(date: Date): string {
  const days = Math.floor((Date.now() - date.getTime()) / DAY_MS);
  if (days <= 0) return "today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}
