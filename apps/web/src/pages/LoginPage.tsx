import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, LoaderCircle, Sparkles } from "lucide-react";

import { getCurrentAccount, login } from "../lib/auth-api";

export function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void getCurrentAccount()
      .then(() => {
        navigate("/dashboard", { replace: true });
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

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Unable to sign in.");
      setIsLoading(false);
    }
  }

  return (
    <AuthShell
      eyebrow="Dashboard Access"
      title="Sign in to Findable"
      description="Use the same email as your scans to link the free report history with your dashboard."
      footer={
        <>
          Need an account?{" "}
          <Link to="/signup" className="font-medium text-[#ccff00] transition hover:text-white">
            Create one
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
            placeholder="Enter your password"
            className="landing-input mt-1.5"
            autoComplete="current-password"
            required
          />
        </label>

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-sm font-medium text-text-secondary hover:text-[#ccff00]">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-white"
        >
          {isLoading ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign in
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>

        {error ? <p className="text-sm text-red-400">{error}</p> : null}
      </form>
    </AuthShell>
  );
}

function AuthShell({
  children,
  description,
  eyebrow,
  footer,
  title,
}: {
  children: ReactNode;
  description: string;
  eyebrow: string;
  footer: ReactNode;
  title: string;
}) {
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
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#ccff00]">
            {eyebrow}
          </p>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-text-secondary">{description}</p>
        </div>

        {children}

        <p className="mt-8 text-center text-sm text-text-muted">{footer}</p>
      </div>
    </div>
  );
}

export { AuthShell };
