import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
import { ArrowRight, Sparkles } from "lucide-react";

export function NotFoundPage() {
  usePageTitle("Page not found");
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg-primary px-4 text-text-primary sm:px-6">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[400px] w-full max-w-[375px] -translate-x-1/2 rounded-full bg-[#ccff00]/8 blur-[120px] sm:max-w-[600px]" />
      </div>

      <div className="relative text-center">
        <a href="/" className="inline-flex items-center gap-2.5">
          <Sparkles className="h-7 w-7 text-[#ccff00]" />
          <span className="text-lg font-bold uppercase tracking-[0.2em]">FINDABLE</span>
        </a>

        <p className="mt-10 font-mono text-5xl font-extrabold text-[#ccff00] sm:text-7xl">404</p>
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight">Page not found</h1>
        <p className="mt-2 text-sm text-white/60">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold"
          >
            Back to home <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/login"
            className="btn-secondary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
