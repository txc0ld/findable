import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
}

export function useInView<T extends HTMLElement>({
  once = true,
  rootMargin = "0px",
  threshold = 0.15,
}: UseInViewOptions = {}) {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    if (isInView && once) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true);

          if (once) {
            observer.disconnect();
          }

          return;
        }

        if (!once) {
          setIsInView(false);
        }
      },
      {
        rootMargin,
        threshold,
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [isInView, once, rootMargin, threshold]);

  return { isInView, ref };
}
