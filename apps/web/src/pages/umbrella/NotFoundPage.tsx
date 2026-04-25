import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { usePageTitle } from "../../hooks/usePageTitle";

export function NotFoundPage() {
  usePageTitle("Page not found");

  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-5 py-20 text-center sm:px-6">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[400px] w-full max-w-[375px] -translate-x-1/2 rounded-full bg-white/5 blur-[120px] sm:max-w-[600px]" />
      </div>

      <div className="relative">
        <p className="font-mono text-5xl font-extrabold text-white sm:text-7xl">404</p>
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight">Page not found</h1>
        <p className="mt-2 text-sm text-white/60">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold"
          >
            Back to apps
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
