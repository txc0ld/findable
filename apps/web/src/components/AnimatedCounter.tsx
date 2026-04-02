import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "../lib/use-prefers-reduced-motion";
import { useInView } from "../lib/use-in-view";

interface AnimatedCounterProps {
  className?: string | undefined;
  decimals?: number | undefined;
  duration?: number | undefined;
  prefix?: string | undefined;
  suffix?: string | undefined;
  value: number;
}

export function AnimatedCounter({
  className,
  decimals = 0,
  duration = 1.2,
  prefix = "",
  suffix = "",
  value,
}: AnimatedCounterProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { isInView, ref } = useInView<HTMLSpanElement>({ threshold: 0.5 });
  const [displayValue, setDisplayValue] = useState(prefersReducedMotion ? value : 0);

  useEffect(() => {
    if (!isInView || prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    const startTime = performance.now();
    let frameId = 0;

    const tick = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(value * easedProgress);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [duration, isInView, prefersReducedMotion, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
}
