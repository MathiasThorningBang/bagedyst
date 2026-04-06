"use client";

import { cn } from "@/lib/utils";
import type { WizardStep } from "@/lib/types";

const steps: { key: WizardStep; label: string }[] = [
  { key: "kage-type", label: "Type" },
  { key: "smag", label: "Smag" },
  { key: "pynt", label: "Pynt" },
  { key: "tekst", label: "Tekst" },
  { key: "anledning", label: "Anledning" },
  { key: "overblik", label: "Overblik" },
];

interface ProgressBarProps {
  currentStep: WizardStep;
  onStepClick: (step: WizardStep) => void;
}

export function ProgressBar({ currentStep, onStepClick }: ProgressBarProps) {
  const currentIndex = steps.findIndex((s) => s.key === currentStep);

  return (
    <div className="flex items-center gap-1.5 px-2">
      {steps.map((step, i) => {
        const isCompleted = i < currentIndex;
        const isCurrent = step.key === currentStep;
        const isClickable = isCompleted;

        return (
          <button
            key={step.key}
            onClick={() => isClickable && onStepClick(step.key)}
            disabled={!isClickable}
            className={cn(
              "flex-1 rounded-full py-1 text-center text-xs font-medium transition-all",
              isCurrent && "bg-[var(--gold)] text-white",
              isCompleted && "cursor-pointer bg-[var(--gold)]/30 text-[var(--warm-brown)] hover:bg-[var(--gold)]/50",
              !isCurrent && !isCompleted && "bg-[var(--warm-brown)]/5 text-[var(--warm-brown)]/30"
            )}
          >
            <span className="hidden sm:inline">{step.label}</span>
            <span className="sm:hidden">{i + 1}</span>
          </button>
        );
      })}
    </div>
  );
}
