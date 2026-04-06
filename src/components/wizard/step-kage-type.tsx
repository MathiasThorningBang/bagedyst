"use client";

import { kageTyper } from "@/lib/data";
import { OptionCard } from "@/components/ui/option-card";
import { motion } from "motion/react";

interface StepKageTypeProps {
  selected: string | null;
  onSelect: (id: string) => void;
}

export function StepKageType({ selected, onSelect }: StepKageTypeProps) {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-[var(--warm-brown)]">Vælg kage-type</h2>
      <p className="mb-6 text-[var(--warm-brown)]/60">Hvad slags kage drømmer du om?</p>
      <motion.div
        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
      >
        {kageTyper.map((kage) => (
          <motion.div
            key={kage.id}
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
          >
            <OptionCard
              emoji={kage.emoji}
              name={kage.name}
              description={kage.description}
              selected={selected === kage.id}
              onClick={() => onSelect(kage.id)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
