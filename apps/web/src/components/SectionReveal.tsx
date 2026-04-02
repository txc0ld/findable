import type { PropsWithChildren } from "react";

import { usePrefersReducedMotion } from "../lib/use-prefers-reduced-motion";
import { useInView } from "../lib/use-in-view";

interface SectionRevealProps extends PropsWithChildren {
  className?: string;
  delay?: number;
  id?: string;
}

export function SectionReveal({
  children,
  className,
  delay = 0,
  id,
}: SectionRevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { isInView, ref } = useInView<HTMLElement>({ threshold: 0.15 });

  return (
    <section
      id={id}
      ref={ref}
      className={`${className ?? ""} section-reveal ${
        isInView || prefersReducedMotion ? "section-reveal-visible" : ""
      }`.trim()}
      style={{
        transitionDelay: prefersReducedMotion ? "0ms" : `${delay * 1000}ms`,
      }}
    >
      {children}
    </section>
  );
}
