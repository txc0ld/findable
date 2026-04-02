import { useEffect, useId, useRef, useState } from "react";

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
  const widgetId = useId().replace(/:/g, "");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loadState, setLoadState] = useState<"idle" | "ready" | "error">("idle");
  const siteKey = import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY;
  const isDevFallback = !siteKey;

  useEffect(() => {
    if (isDevFallback) {
      onTokenChange("dev-turnstile-bypass");
      setLoadState("ready");
      return;
    }

    onTokenChange(null);

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
            onTokenChange(token);
          },
          "error-callback": () => {
            onTokenChange(null);
            setLoadState("error");
          },
          "expired-callback": () => {
            onTokenChange(null);
          },
        });

        setLoadState("ready");
      })
      .catch(() => {
        if (!isActive) {
          return;
        }

        onTokenChange(null);
        setLoadState("error");
      });

    return () => {
      isActive = false;

      if (containerRef.current && window.turnstile) {
        window.turnstile.remove(containerRef.current);
      }
    };
  }, [isDevFallback, onTokenChange, siteKey, widgetId]);

  return (
    <div className="space-y-3">
      <div
        className={`rounded-2xl border p-4 ${
          error
            ? "border-score-critical/35 bg-score-critical/8"
            : "border-white/8 bg-white/4"
        }`}
      >
        <div className="flex items-center justify-between gap-4 text-sm text-text-secondary">
          <span>Bot protection</span>
          <span className="rounded-full border border-[#ccff00]/25 bg-[#ccff00]/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-[#ccff00]">
            Cloudflare
          </span>
        </div>
        {isDevFallback ? (
          <div className="mt-4 rounded-2xl border border-dashed border-white/10 bg-black/10 px-4 py-5 text-sm text-text-secondary">
            Turnstile site key missing. Local preview mode is active until
            `VITE_CLOUDFLARE_TURNSTILE_SITE_KEY` is configured.
          </div>
        ) : (
          <div ref={containerRef} className="mt-4 min-h-16" />
        )}
      </div>
      {loadState === "error" ? (
        <p className="text-sm text-score-critical">
          Turnstile could not load. Refresh and try again.
        </p>
      ) : null}
      {error ? <p className="text-sm text-score-critical">{error}</p> : null}
    </div>
  );
}
