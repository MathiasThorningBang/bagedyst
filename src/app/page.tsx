"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Cake } from "lucide-react";
import type { CakeConfig, WizardStep } from "@/lib/types";
import { defaultConfig } from "@/lib/types";
import { ProgressBar } from "@/components/wizard/progress-bar";
import { StepKageType } from "@/components/wizard/step-kage-type";
import { StepSmag } from "@/components/wizard/step-smag";
import { StepPynt } from "@/components/wizard/step-pynt";
import { StepTekst } from "@/components/wizard/step-tekst";
import { StepAnledning } from "@/components/wizard/step-anledning";
import { StepOverblik } from "@/components/wizard/step-overblik";
import { GenerateResult } from "@/components/wizard/generate-result";

const stepOrder: WizardStep[] = [
  "kage-type",
  "smag",
  "pynt",
  "tekst",
  "anledning",
  "overblik",
];

export default function Home() {
  const [step, setStep] = useState<WizardStep>("landing");
  const [config, setConfig] = useState<CakeConfig>(defaultConfig);
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageData, setImageData] = useState<{
    image: string;
    mimeType: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const currentStepIndex = stepOrder.indexOf(step);

  const canAdvance = useCallback(() => {
    switch (step) {
      case "kage-type":
        return !!config.kageType;
      case "smag":
        return !!config.smag;
      case "pynt":
        return !!config.pynt;
      case "tekst":
        return true;
      case "anledning":
        return !!config.anledning;
      default:
        return false;
    }
  }, [step, config]);

  function goNext() {
    if (currentStepIndex < stepOrder.length - 1 && canAdvance()) {
      setStep(stepOrder[currentStepIndex + 1]);
    }
  }

  function goBack() {
    if (currentStepIndex > 0) {
      setStep(stepOrder[currentStepIndex - 1]);
    } else if (step === "genererer") {
      setStep("overblik");
    }
  }

  async function handleGenerate() {
    setIsGenerating(true);
    setError(null);
    setImageData(null);
    setStep("genererer");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Der opstod en fejl");
        return;
      }

      setImageData({ image: data.image, mimeType: data.mimeType });
    } catch {
      setError("Kunne ikke forbinde til serveren. Prøv igen.");
    } finally {
      setIsGenerating(false);
    }
  }

  function handleReset() {
    setConfig(defaultConfig);
    setStep("landing");
    setImageData(null);
    setError(null);
  }

  // Landing screen
  if (step === "landing") {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-[var(--gold)]/15 p-5">
              <Cake className="h-14 w-14 text-[var(--gold)]" />
            </div>
          </div>
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-[var(--warm-brown)] sm:text-5xl">
            Byg Din Drømmekage
          </h1>
          <p className="mx-auto mb-10 max-w-md text-lg text-[var(--warm-brown)]/60">
            Vælg type, smag, pynt og mere — og lad AI generere et billede af din
            perfekte kage
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setStep("kage-type")}
            className="rounded-2xl bg-[var(--gold)] px-10 py-4 text-lg font-bold text-white shadow-lg transition-colors hover:bg-[var(--gold)]/90"
          >
            Start
          </motion.button>
          <p className="mt-8 text-sm text-[var(--warm-brown)]/40">
            8 kagetyper &middot; 10 smage &middot; Uendelige muligheder
          </p>
        </motion.div>
      </div>
    );
  }

  // Generate result screen
  if (step === "genererer") {
    return (
      <div className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-5 py-8">
        <GenerateResult
          isLoading={isGenerating}
          imageData={imageData}
          error={error}
          onReset={handleReset}
          onRetry={handleGenerate}
        />
      </div>
    );
  }

  // Wizard steps
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-5 py-6">
      <ProgressBar currentStep={step} onStepClick={setStep} />

      <div className="mt-8 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {step === "kage-type" && (
              <StepKageType
                selected={config.kageType}
                onSelect={(id) => setConfig((c) => ({ ...c, kageType: id }))}
              />
            )}
            {step === "smag" && (
              <StepSmag
                selectedSmag={config.smag}
                selectedIngredienser={config.ingredienser}
                onSelectSmag={(id) => setConfig((c) => ({ ...c, smag: id }))}
                onToggleIngrediens={(id) =>
                  setConfig((c) => ({
                    ...c,
                    ingredienser: c.ingredienser.includes(id)
                      ? c.ingredienser.filter((i) => i !== id)
                      : [...c.ingredienser, id],
                  }))
                }
              />
            )}
            {step === "pynt" && (
              <StepPynt
                selected={config.pynt}
                onSelect={(id) => setConfig((c) => ({ ...c, pynt: id }))}
              />
            )}
            {step === "tekst" && (
              <StepTekst
                tekst={config.tekstPaaKage}
                onTekstChange={(tekst) =>
                  setConfig((c) => ({ ...c, tekstPaaKage: tekst }))
                }
              />
            )}
            {step === "anledning" && (
              <StepAnledning
                selected={config.anledning}
                onSelect={(id) => setConfig((c) => ({ ...c, anledning: id }))}
              />
            )}
            {step === "overblik" && (
              <StepOverblik
                config={config}
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      {step !== "overblik" && (
        <div className="mt-6 flex items-center justify-between pb-4">
          <button
            onClick={goBack}
            disabled={currentStepIndex === 0}
            className="flex items-center gap-1 rounded-xl px-4 py-3 text-base font-medium text-[var(--warm-brown)]/60 transition-colors hover:text-[var(--warm-brown)] disabled:invisible"
          >
            <ChevronLeft className="h-4 w-4" />
            Tilbage
          </button>
          <button
            onClick={goNext}
            disabled={!canAdvance()}
            className="flex items-center gap-1 rounded-xl bg-[var(--gold)] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[var(--gold)]/90 disabled:opacity-30"
          >
            Næste
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
