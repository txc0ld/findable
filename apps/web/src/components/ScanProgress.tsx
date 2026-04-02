import { ScanLine } from "lucide-react";
import { useEffect, useState } from "react";

const SCAN_STEPS = [
  "Scanning page 1 of 3...",
  "Scanning page 2 of 3...",
  "Scanning page 3 of 3...",
  "Extracting structured data...",
  "Analyzing LLM readiness...",
  "Calculating score...",
];

interface ScanProgressProps {
  onComplete: () => void;
}

export function ScanProgress({ onComplete }: ScanProgressProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= SCAN_STEPS.length) {
      const timeoutId = window.setTimeout(onComplete, 600);
      return () => window.clearTimeout(timeoutId);
    }

    const timeoutId = window.setTimeout(() => {
      setStep((currentStep) => currentStep + 1);
    }, 800);

    return () => window.clearTimeout(timeoutId);
  }, [onComplete, step]);

  const progress = Math.min((step / SCAN_STEPS.length) * 100, 100);

  return (
    <div className="flex flex-col items-center py-24">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#ccff00]/20 bg-[#ccff00]/10">
        <ScanLine className="h-8 w-8 animate-pulse text-[#ccff00]" />
      </div>

      <p className="mt-6 text-xl font-bold">Scanning your products</p>

      <div className="mt-8 w-full max-w-xs">
        <div className="h-1 overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-[#ccff00] transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-4 h-6">
        {step < SCAN_STEPS.length ? (
          <p
            key={step}
            className="scan-step-fade text-sm text-text-secondary"
          >
            {SCAN_STEPS[step]}
          </p>
        ) : null}
      </div>
    </div>
  );
}
