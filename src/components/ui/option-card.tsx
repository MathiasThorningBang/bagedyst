"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface OptionCardProps {
  emoji?: string;
  name: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
}

export function OptionCard({ emoji, name, description, selected, onClick }: OptionCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "flex h-full w-full flex-col items-start gap-1 rounded-2xl border-2 p-5 text-left transition-colors",
        selected
          ? "border-[var(--gold)] bg-[var(--gold)]/10"
          : "border-[var(--warm-brown)]/10 bg-white hover:border-[var(--gold)]/50"
      )}
    >
      {emoji && <span className="text-3xl">{emoji}</span>}
      <span className="text-lg font-semibold text-[var(--warm-brown)]">{name}</span>
      {description && (
        <span className="text-sm text-[var(--warm-brown)]/60">{description}</span>
      )}
    </motion.button>
  );
}
