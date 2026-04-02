export interface ScoreTone {
  accentClass: string;
  badgeClass: string;
  color: string;
  glowClass: string;
  ringClass: string;
  trackClass: string;
}

export function getScoreTone(score: number): ScoreTone {
  if (score <= 25) {
    return {
      accentClass: "text-score-critical",
      badgeClass: "bg-score-critical/12 text-score-critical border-score-critical/25",
      color: "#EF4444",
      glowClass: "bg-score-critical/35",
      ringClass: "stroke-score-critical",
      trackClass: "stroke-score-critical/20",
    };
  }

  if (score <= 40) {
    return {
      accentClass: "text-score-poor",
      badgeClass: "bg-score-poor/12 text-score-poor border-score-poor/25",
      color: "#F97316",
      glowClass: "bg-score-poor/35",
      ringClass: "stroke-score-poor",
      trackClass: "stroke-score-poor/20",
    };
  }

  if (score <= 55) {
    return {
      accentClass: "text-score-fair",
      badgeClass: "bg-score-fair/12 text-score-fair border-score-fair/25",
      color: "#F59E0B",
      glowClass: "bg-score-fair/35",
      ringClass: "stroke-score-fair",
      trackClass: "stroke-score-fair/20",
    };
  }

  if (score <= 70) {
    return {
      accentClass: "text-score-good",
      badgeClass: "bg-score-good/12 text-score-good border-score-good/25",
      color: "#84CC16",
      glowClass: "bg-score-good/35",
      ringClass: "stroke-score-good",
      trackClass: "stroke-score-good/20",
    };
  }

  if (score <= 85) {
    return {
      accentClass: "text-score-great",
      badgeClass: "bg-score-great/12 text-score-great border-score-great/25",
      color: "#10B981",
      glowClass: "bg-score-great/35",
      ringClass: "stroke-score-great",
      trackClass: "stroke-score-great/20",
    };
  }

  return {
    accentClass: "text-score-excellent",
    badgeClass: "bg-score-excellent/12 text-score-excellent border-score-excellent/25",
    color: "#06B6D4",
    glowClass: "bg-score-excellent/35",
    ringClass: "stroke-score-excellent",
    trackClass: "stroke-score-excellent/20",
  };
}
