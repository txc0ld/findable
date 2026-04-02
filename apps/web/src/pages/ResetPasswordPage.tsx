import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, LoaderCircle } from "lucide-react";

import { usePageTitle } from "../hooks/usePageTitle";
import { resetPassword } from "../lib/auth-api";
import { AuthShell } from "./LoginPage";

export function ResetPasswordPage() {
  usePageTitle("Reset password");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = searchParams.get("token")?.trim() ?? "";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (!token) {
      setError("Reset token missing.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      await resetPassword(token, password);
      navigate("/dashboard");
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Unable to reset password.");
      setIsLoading(false);
    }
  }

  return (
    <AuthShell
      eyebrow="Reset Complete Access"
      title="Choose a new password"
      description="This link expires after one hour. Once it succeeds, you’ll be signed straight back into the dashboard."
      footer={
        <>
          Back to{" "}
          <Link to="/login" className="font-medium text-[#ccff00] transition hover:text-white">
            sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label className="block">
          <span className="text-sm text-text-secondary">New password</span>
          <input
            name="password"
            type="password"
            placeholder="At least 8 characters"
            className="landing-input mt-1.5"
            autoComplete="new-password"
            minLength={8}
            required
          />
        </label>

        <label className="block">
          <span className="text-sm text-text-secondary">Confirm new password</span>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Repeat your password"
            className="landing-input mt-1.5"
            autoComplete="new-password"
            minLength={8}
            required
          />
        </label>

        <button
          type="submit"
          disabled={isLoading || !token}
          className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold"
        >
          {isLoading ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Updating password...
            </>
          ) : (
            <>
              Save new password
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>

        {!token ? <p className="text-sm text-red-400">Reset token missing.</p> : null}
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
      </form>
    </AuthShell>
  );
}
