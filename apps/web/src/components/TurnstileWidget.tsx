import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      remove: (container: string | HTMLElement) => void;
      render: (
        container: string | HTMLElement,
        options: {
          callback: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          sitekey: string;
          theme?: "dark" | "light" | "auto";
        },
      ) => string;
    };
  }
}

interface TurnstileWidgetProps {
  error: string | null;
  onTokenChange: (token: string | null) => void;
}

let turnstileScriptPromise: Promise<void> | null = null;

function loadTurnstileScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.turnstile) {
    return Promise.resolve();
  }

  if (turnstileScriptPromise) {
    return turnstileScriptPromise;
  }

  turnstileScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]',
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("Turnstile failed")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Turnstile failed"));
    document.head.appendChild(script);
  });

  return turnstileScriptPromise;
}

export function TurnstileWidget({
  error,
  onTokenChange,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const onTokenChangeRef = useRef(onTokenChange);
  const [loadState, setLoadState] = useState<"idle" | "ready" | "error">("idle");
  const siteKey = import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY;
  const isDevFallback = !siteKey;

  useEffect(() => {
    onTokenChangeRef.current = onTokenChange;
  }, [onTokenChange]);

  useEffect(() => {
    if (isDevFallback) {
      onTokenChangeRef.current("dev-turnstile-bypass");
      setLoadState("ready");
      return;
    }

    onTokenChangeRef.current(null);

    let isActive = true;

    loadTurnstileScript()
      .then(() => {
        if (!isActive || !containerRef.current || !window.turnstile) {
          return;
        }

        window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: "dark",
          callback: (token) => {
            onTokenChangeRef.current(token);
          },
          "error-callback": () => {
            onTokenChangeRef.current(null);
            setLoadState("error");
          },
          "expired-callback": () => {
            onTokenChangeRef.current(null);
          },
        });

        setLoadState("ready");
      })
      .catch(() => {
        if (!isActive) {
          return;
        }

        onTokenChangeRef.current(null);
        setLoadState("error");
      });

    return () => {
      isActive = false;

      if (containerRef.current && window.turnstile) {
        window.turnstile.remove(containerRef.current);
      }
    };
  }, [isDevFallback, siteKey]);

  return (
    <div className="space-y-2">
      <div
        className={`rounded-2xl border p-3 ${
          error
            ? "border-score-critical/35 bg-score-critical/8"
            : "border-white/8 bg-white/4"
        }`}
      >
        {isDevFallback ? (
          <div className="rounded-xl border border-dashed border-white/10 bg-black/10 px-4 py-4 text-center text-sm text-text-secondary">
            Turnstile site key missing. Local preview mode is active until
            `VITE_CLOUDFLARE_TURNSTILE_SITE_KEY` is configured.
          </div>
        ) : (
          <div ref={containerRef} className="flex min-h-16 items-center justify-center [&>div]:mx-auto" />
        )}
      </div>
      {loadState === "error" ? (
        <p className="text-center text-xs text-score-critical">
          Turnstile could not load. Refresh and try again.
        </p>
      ) : null}
      {error ? <p className="text-center text-xs text-score-critical">{error}</p> : null}
    </div>
  );
}
