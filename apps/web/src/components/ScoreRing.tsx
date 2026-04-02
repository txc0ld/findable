import { getScoreBand } from "@findable/shared";

import { AnimatedCounter } from "./AnimatedCounter";
import { getScoreTone } from "../lib/scores";
import { usePrefersReducedMotion } from "../lib/use-prefers-reduced-motion";
import { useInView } from "../lib/use-in-view";

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export function ScoreRing({
  score,
  size = 220,
  strokeWidth = 8,
}: ScoreRingProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { isInView, ref } = useInView<HTMLDivElement>({ threshold: 0.3 });

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score / 100);

  const tone = getScoreTone(score);
  const band = getScoreBand(score);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center"
    >
      <div className="relative" style={{ width: size, height: size }}>
        <div
          className="absolute inset-6 rounded-full blur-3xl"
          style={{ background: tone.color, opacity: 0.15 }}
        />

        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={tone.color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={
              isInView || prefersReducedMotion ? offset : circumference
            }
            strokeLinecap="round"
            style={{
              transition: prefersReducedMotion
                ? "none"
                : "stroke-dashoffset 1.5s cubic-bezier(0.65, 0, 0.35, 1) 0.3s",
            }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={`text-5xl font-extrabold tracking-[-0.04em] sm:text-7xl lg:text-8xl ${tone.accentClass}`}
          >
            <AnimatedCounter value={score} duration={1.5} />
          </span>
        </div>
      </div>

      <p className="mt-5 text-lg font-semibold text-text-primary">
        Your Findable Score
      </p>
      <p className={`mt-1 text-sm font-medium ${tone.accentClass}`}>
        {band.label}
      </p>
    </div>
  );
}
