"use client";

import { smage, ingredienser as ingredienserData } from "@/lib/data";
import { OptionChip } from "@/components/ui/option-chip";
import { motion } from "motion/react";

interface StepSmagProps {
  selectedSmag: string | null;
  selectedIngredienser: string[];
  onSelectSmag: (id: string) => void;
  onToggleIngrediens: (id: string) => void;
}

export function StepSmag({
  selectedSmag,
  selectedIngredienser,
  onSelectSmag,
  onToggleIngrediens,
}: StepSmagProps) {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-[var(--warm-brown)]">Vælg smag</h2>
      <p className="mb-6 text-[var(--warm-brown)]/60">Hvad skal kagen smage af?</p>

      <motion.div
        className="flex flex-wrap gap-2.5"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.03 } } }}
      >
        {smage.map((s) => (
          <motion.div
            key={s.id}
            variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
          >
            <OptionChip
              name={s.name}
              color={s.color}
              selected={selectedSmag === s.id}
              onClick={() => onSelectSmag(s.id)}
            />
          </motion.div>
        ))}
      </motion.div>

      <h3 className="mb-3 mt-8 text-lg font-semibold text-[var(--warm-brown)]">
        Tilføj ingredienser
      </h3>
      <p className="mb-4 text-sm text-[var(--warm-brown)]/60">Vælg en eller flere (valgfrit)</p>

      <motion.div
        className="flex flex-wrap gap-2.5"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.03, delayChildren: 0.2 } } }}
      >
        {ingredienserData.map((ing) => (
          <motion.div
            key={ing.id}
            variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
          >
            <OptionChip
              name={ing.name}
              emoji={ing.emoji}
              selected={selectedIngredienser.includes(ing.id)}
              onClick={() => onToggleIngrediens(ing.id)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
