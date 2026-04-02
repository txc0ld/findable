export interface ScoreBand {
  min: number;
  max: number;
  label: string;
  color: string;
}

export const SCORE_BANDS: ScoreBand[] = [
  {
    min: 0,
    max: 25,
    label: "Critical - invisible to AI",
    color: "#EF4444",
  },
  {
    min: 26,
    max: 40,
    label: "Poor - major gaps",
    color: "#F97316",
  },
  {
    min: 41,
    max: 55,
    label: "Fair - needs work",
    color: "#F59E0B",
  },
  {
    min: 56,
    max: 70,
    label: "Good - on the right track",
    color: "#84CC16",
  },
  {
    min: 71,
    max: 85,
    label: "Great - competitive",
    color: "#10B981",
  },
  {
    min: 86,
    max: 100,
    label: "Excellent - fully optimized",
    color: "#06B6D4",
  },
];

export function getScoreBand(score: number): ScoreBand {
  return (
    SCORE_BANDS.find((band) => score >= band.min && score <= band.max) ??
    SCORE_BANDS[SCORE_BANDS.length - 1]!
  );
}
