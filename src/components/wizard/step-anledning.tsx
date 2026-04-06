"use client";

import { anledninger } from "@/lib/data";
import { OptionCard } from "@/components/ui/option-card";
import { motion } from "motion/react";

interface StepAnledningProps {
  selected: string | null;
  onSelect: (id: string) => void;
}

export function StepAnledning({ selected, onSelect }: StepAnledningProps) {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-[var(--warm-brown)]">Anledning</h2>
      <p className="mb-6 text-[var(--warm-brown)]/60">Hvad skal kagen fejre?</p>
      <motion.div
        className="grid grid-cols-2 gap-3 sm:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
      >
        {anledninger.map((a) => (
          <motion.div
            key={a.id}
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
          >
            <OptionCard
              emoji={a.emoji}
              name={a.name}
              selected={selected === a.id}
              onClick={() => onSelect(a.id)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
