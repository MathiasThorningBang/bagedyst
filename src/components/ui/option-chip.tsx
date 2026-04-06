"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface OptionChipProps {
  name: string;
  emoji?: string;
  color?: string;
  selected: boolean;
  onClick: () => void;
}

export function OptionChip({ name, emoji, color, selected, onClick }: OptionChipProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border-2 px-4 py-2.5 text-base font-medium transition-colors",
        selected
          ? "border-[var(--gold)] bg-[var(--gold)]/15 text-[var(--warm-brown)]"
          : "border-[var(--warm-brown)]/10 bg-white text-[var(--warm-brown)]/70 hover:border-[var(--gold)]/40"
      )}
    >
      {color && (
        <span
          className="h-4 w-4 rounded-full border border-black/10"
          style={{ backgroundColor: color }}
        />
      )}
      {emoji && <span>{emoji}</span>}
      <span>{name}</span>
    </motion.button>
  );
}
