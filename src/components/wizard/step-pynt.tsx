"use client";

import { pyntStile } from "@/lib/data";
import { OptionCard } from "@/components/ui/option-card";
import { motion } from "motion/react";

interface StepPyntProps {
  selected: string | null;
  onSelect: (id: string) => void;
}

export function StepPynt({ selected, onSelect }: StepPyntProps) {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-[var(--warm-brown)]">Vælg pynt</h2>
      <p className="mb-6 text-[var(--warm-brown)]/60">Hvordan skal kagen dekoreres?</p>
      <motion.div
        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
      >
        {pyntStile.map((p) => (
          <motion.div
            key={p.id}
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
          >
            <OptionCard
              emoji={p.emoji}
              name={p.name}
              description={p.description}
              selected={selected === p.id}
              onClick={() => onSelect(p.id)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
