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
      <div className="card-glass p-6 sm:p-8 border-none bg-transparent shadow-none backdrop-blur-none">
        <div className="space-y-4">
          {values.urls.map((url, index) => (
            <div key={`scan-url-${index}`}>
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
                aria-label={
                  index === 2
                    ? "Product URL (optional)"
                    : `Product URL ${index + 1}`
                }
              />
              {errors.urls[index] && (
                <p className="mt-1.5 text-sm text-red-400">
                  {errors.urls[index]}
                </p>
              )}
            </div>
          ))}

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

          <TurnstileWidget
            error={errors.turnstile}
            onTokenChange={handleTurnstileChange}
          />

          <button
            className="btn-primary cta-pulse flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-semibold text-white"
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

          <p className="text-center text-xs text-text-muted">
            Protected by Cloudflare &middot; Free &middot; 15 seconds
          </p>
        </div>
      </div>
    </form>
  );
}
