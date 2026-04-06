"use client";

import { motion } from "motion/react";

interface StepTekstProps {
  tekst: string;
  onTekstChange: (tekst: string) => void;
}

const MAX_CHARS = 40;

export function StepTekst({ tekst, onTekstChange }: StepTekstProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="mb-2 text-2xl font-bold text-[var(--warm-brown)]">Tekst på kagen</h2>
      <p className="mb-6 text-[var(--warm-brown)]/60">
        Skriv en besked der skal stå på kagen med glasur (valgfrit)
      </p>

      <div className="relative">
        <input
          type="text"
          value={tekst}
          onChange={(e) => {
            if (e.target.value.length <= MAX_CHARS) {
              onTekstChange(e.target.value);
            }
          }}
          placeholder='F.eks. "Tillykke med de 50!"'
          className="w-full rounded-2xl border-2 border-[var(--warm-brown)]/10 bg-white px-5 py-4 text-lg text-[var(--warm-brown)] placeholder:text-[var(--warm-brown)]/30 focus:border-[var(--gold)] focus:outline-none"
        />
        <span className="absolute bottom-4 right-4 text-sm text-[var(--warm-brown)]/40">
          {tekst.length}/{MAX_CHARS}
        </span>
      </div>

      {tekst && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex justify-center"
        >
          <div className="rounded-xl bg-[var(--dusty-pink)]/20 px-8 py-4">
            <p className="text-center text-xl font-semibold italic text-[var(--warm-brown)]">
              &ldquo;{tekst}&rdquo;
            </p>
          </div>
        </motion.div>
      )}

      <button
        onClick={() => onTekstChange("")}
        className="mt-4 text-sm text-[var(--warm-brown)]/50 underline hover:text-[var(--warm-brown)]/70"
      >
        Ingen tekst på kagen
      </button>
    </motion.div>
  );
}
