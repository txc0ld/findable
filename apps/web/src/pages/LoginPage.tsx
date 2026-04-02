import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, LoaderCircle, Sparkles } from "lucide-react";

import { getSessionEmail, setSessionEmail } from "../lib/session";
import { createSession } from "../lib/workspace-api";

export function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (getSessionEmail()) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "").trim();

    try {
      await createSession(email);
      setSessionEmail(email);
      navigate("/dashboard");
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Unable to open the workspace.");
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg-primary px-4 text-text-primary">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[#ccff00]/10 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-sm">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <Sparkles className="h-7 w-7 text-[#ccff00]" />
            <span className="text-lg font-bold uppercase tracking-[0.2em]">FINDABLE</span>
          </Link>
          <h1 className="mt-6 text-2xl font-extrabold tracking-tight">Open your workspace</h1>
          <p className="mt-2 text-sm text-text-secondary">
            Enter the same email you used for a scan and we&apos;ll load your dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-sm text-text-secondary">Email</span>
            <input
              name="email"
              type="email"
              placeholder="you@store.com"
              defaultValue="demo@store.com"
              className="landing-input mt-1.5"
              required
            />
          </label>

          <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-left text-sm leading-relaxed text-text-secondary">
            This v1 dashboard uses email-based session access. Stripe auth, team auth, and store
            install auth can layer on top later without changing the core product flow.
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-white"
          >
            {isLoading ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Opening workspace...
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}
        </form>

        <p className="mt-8 text-center text-sm text-text-muted">
          Need a report first?{" "}
          <a href="/#hero-form" className="font-medium text-[#ccff00] transition hover:text-[#ccff00]">
            Start a free scan
          </a>
        </p>
      </div>
    </div>
  );
}
