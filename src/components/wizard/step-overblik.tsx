"use client";

import type { CakeConfig } from "@/lib/types";
import { kageTyper, smage as smageData, ingredienser, pyntStile, anledninger, getOptionName } from "@/lib/data";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

interface StepOverblikProps {
  config: CakeConfig;
  onGenerate: () => void;
  isGenerating: boolean;
}

function SummaryRow({ label, value, emoji }: { label: string; value: string; emoji?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--warm-brown)]/5 py-3 last:border-0">
      <span className="text-sm text-[var(--warm-brown)]/60">{label}</span>
      <span className="flex items-center gap-1.5 font-medium text-[var(--warm-brown)]">
        {emoji && <span>{emoji}</span>}
        {value}
      </span>
    </div>
  );
}

export function StepOverblik({ config, onGenerate, isGenerating }: StepOverblikProps) {
  const kage = kageTyper.find((k) => k.id === config.kageType);
  const smag = smageData.find((s) => s.id === config.smag);
  const pynt = pyntStile.find((p) => p.id === config.pynt);
  const anledning = anledninger.find((a) => a.id === config.anledning);

  const ingrediensNavne = config.ingredienser
    .map((id) => getOptionName(id, ingredienser))
    .join(", ");

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="mb-2 text-2xl font-bold text-[var(--warm-brown)]">Din drømmekage</h2>
      <p className="mb-6 text-[var(--warm-brown)]/60">Se dine valg og generer et billede</p>

      <div className="rounded-2xl border-2 border-[var(--warm-brown)]/10 bg-white p-5">
        <SummaryRow label="Kage-type" value={kage?.name ?? "—"} emoji={kage?.emoji} />
        <SummaryRow label="Smag" value={smag?.name ?? "—"} />
        {ingrediensNavne && <SummaryRow label="Ingredienser" value={ingrediensNavne} />}
        <SummaryRow label="Pynt" value={pynt?.name ?? "—"} emoji={pynt?.emoji} />
        {config.tekstPaaKage && (
          <SummaryRow label="Tekst" value={`"${config.tekstPaaKage}"`} />
        )}
        <SummaryRow label="Anledning" value={anledning?.name ?? "—"} emoji={anledning?.emoji} />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onGenerate}
        disabled={isGenerating}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--gold)] px-6 py-4 text-lg font-bold text-white transition-colors hover:bg-[var(--gold)]/90 disabled:opacity-50"
      >
        <Sparkles className="h-5 w-5" />
        Generer min kage
      </motion.button>
    </motion.div>
  );
}
