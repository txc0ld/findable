import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, LoaderCircle } from "lucide-react";

import { usePageTitle } from "../../hooks/usePageTitle";
import { getCurrentAccount, signup } from "../../lib/auth-api";
import { AuthShell } from "./LoginPage";

export function SignupPage() {
  usePageTitle("Create account");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void getCurrentAccount()
      .then(() => {
        navigate("/findable/dashboard", { replace: true });
      })
      .catch(() => undefined);
  }, [navigate]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      await signup(email, password);
      navigate("/findable/dashboard");
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Unable to create account.");
      setIsLoading(false);
    }
  }

  return (
    <AuthShell
      eyebrow="Account Setup"
      title="Create your Findable account"
      description="Use the same email as your free scan to attach the existing report history instead of creating a duplicate account."
      footer={
        <>
          Already signed up?{" "}
          <Link to="/findable/login" className="font-medium text-[#ccff00] transition hover:text-white">
            Sign in
          </Link>
        </>
      }
    >
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

        <label className="block">
          <span className="text-sm text-text-secondary">Password</span>
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
          <span className="text-sm text-text-secondary">Confirm password</span>
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
          disabled={isLoading}
          className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold"
        >
          {isLoading ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              Create account
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>

        {error ? <p className="text-sm text-red-400">{error}</p> : null}
      </form>
    </AuthShell>
  );
}
