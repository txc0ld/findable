import { startTransition, useState, type FormEvent } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { createScan } from "../lib/scan-api";
import {
  createEmptyErrors,
  hasFormErrors,
  validateScanForm,
  type ScanFormErrors,
  type ScanFormValues,
} from "../lib/validation";
import { TurnstileWidget } from "./TurnstileWidget";

interface ScanFormProps {
  className?: string;
  ctaLabel?: string;
}

const emptyValues: ScanFormValues = {
  urls: ["", "", ""],
  email: "",
};

export function ScanForm({
  className,
  ctaLabel = "Get Your Findable Score",
}: ScanFormProps) {
  const navigate = useNavigate();
  const [values, setValues] = useState<ScanFormValues>(emptyValues);
  const [errors, setErrors] = useState<ScanFormErrors>(createEmptyErrors);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateUrl(index: number, nextValue: string) {
    setValues((current) => {
      const nextUrls = [...current.urls] as ScanFormValues["urls"];
      nextUrls[index] = nextValue;
      return { ...current, urls: nextUrls };
    });
    setErrors((current) => {
      const next = {
        ...current,
        submit: null,
        urls: [...current.urls] as ScanFormErrors["urls"],
      };
      next.urls[index] = null;
      return next;
    });
  }

  function updateEmail(nextValue: string) {
    setValues((current) => ({ ...current, email: nextValue }));
    setErrors((current) => ({ ...current, email: null, submit: null }));
  }

  function handleTurnstileChange(token: string | null) {
    setTurnstileToken(token);
    setErrors((current) => ({ ...current, submit: null, turnstile: null }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateScanForm(values, turnstileToken);
    setErrors(nextErrors);
    if (hasFormErrors(nextErrors)) return;

    setIsSubmitting(true);

    try {
      const scan = await createScan({
        email: values.email.trim(),
        turnstileToken: turnstileToken ?? "",
        urls: values.urls.map((url) => url.trim()).filter((url) => url.length > 0),
      });

      startTransition(() => {
        navigate(`/scan/${scan.id}`);
      });
    } catch (error) {
      setErrors((current) => ({
        ...current,
        submit:
          error instanceof Error ? error.message : "Unable to start your scan.",
      }));
      setIsSubmitting(false);
    }
  }

  return (
    <form className={className} onSubmit={handleSubmit} noValidate>
      <div className="card-glass border-none bg-transparent p-4 shadow-none backdrop-blur-none sm:p-6 lg:p-8">
        <h3 className="mb-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-white sm:mb-6 sm:text-sm">
          Free <span className="text-[#ccff00]">AI Readiness</span> Scan
        </h3>
        <div className="space-y-3 sm:space-y-4">
          {values.urls.map((url, index) => {
            const labels = ["Product Page 1", "Product Page 2", "Product Page 3 (optional)"];
            return (
              <div key={`scan-url-${index}`}>
                <label className="mb-1.5 block text-xs font-medium text-white/70">
                  {labels[index]}
                </label>
                <input
                  className={`landing-input landing-input-mono ${
                    errors.urls[index] ? "landing-input-error" : ""
                  }`}
                  onChange={(e) => updateUrl(index, e.target.value)}
                  placeholder={
                    index === 0
                      ? "https://your-store.com/products/product-1"
                      : index === 1
                        ? "https://your-store.com/products/product-2"
                        : "https://your-store.com/products/optional"
                  }
                  type="url"
                  value={url}
                />
                {errors.urls[index] && (
                  <p className="mt-1.5 text-sm text-red-400">
                    {errors.urls[index]}
                  </p>
                )}
              </div>
            );
          })}

          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/70">
              Email for report
            </label>
            <input
              className={`landing-input ${errors.email ? "landing-input-error" : ""}`}
              onChange={(e) => updateEmail(e.target.value)}
              placeholder="your@email.com"
              type="email"
              value={values.email}
              aria-label="Work email"
            />
            {errors.email && (
              <p className="mt-1.5 text-sm text-red-400">{errors.email}</p>
            )}
          </div>

          <TurnstileWidget
            error={errors.turnstile}
            onTokenChange={handleTurnstileChange}
          />

          <div className="mt-5 space-y-3 sm:mt-8">
            <button
              className="btn-primary cta-pulse flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold sm:px-6 sm:py-4 sm:text-base"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  {ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            {errors.submit ? (
              <p className="text-center text-sm text-red-400">{errors.submit}</p>
            ) : null}

            <p className="mt-2 text-center text-[10px] tracking-wide text-[#ccff00]/60 sm:mt-4">
              Bot protection by Cloudflare
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
