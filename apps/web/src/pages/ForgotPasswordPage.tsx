import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";

import { forgotPassword } from "../lib/auth-api";
import { AuthShell } from "./LoginPage";

export function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();

    try {
      await forgotPassword(email);
      setSentTo(email);
    } catch (nextError) {
      setError(
        nextError instanceof Error ? nextError.message : "Unable to send reset link.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthShell
      eyebrow="Password Reset"
      title="Reset your password"
      description="We’ll email you a one-hour reset link. If the address exists, the message will arrive there."
      footer={
        <>
          Back to{" "}
          <Link to="/login" className="font-medium text-[#ccff00] transition hover:text-white">
            sign in
          </Link>
        </>
      }
    >
      {sentTo ? (
        <div className="card mt-8 rounded-2xl p-5 text-sm text-text-secondary">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
            <div>
              <p className="font-medium text-text-primary">Reset link sent</p>
              <p className="mt-1">
                If an account exists for <span className="text-text-primary">{sentTo}</span>, the reset
                link is on its way.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-sm text-text-secondary">Email</span>
            <input
              name="email"
              type="email"
              placeholder="you@store.com"
              className="landing-input mt-1.5"
              autoComplete="email"
              required
            />
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-white"
          >
            {isLoading ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Sending link...
              </>
            ) : (
              <>
                Send reset link
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}
        </form>
      )}
    </AuthShell>
  );
}
