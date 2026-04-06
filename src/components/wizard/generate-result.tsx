"use client";

import { motion, AnimatePresence } from "motion/react";
import { Download, RotateCcw, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

const loadingMessages = [
  "Forvarmer ovnen...",
  "Pisker cremen...",
  "Hælder dejen i formen...",
  "Venter tålmodigt ved ovnen...",
  "Smører glasuren på...",
  "Sætter pynt på...",
  "Sidste finish...",
];

interface GenerateResultProps {
  isLoading: boolean;
  imageData: { image: string; mimeType: string } | null;
  error: string | null;
  onReset: () => void;
  onRetry: () => void;
}

export function GenerateResult({
  isLoading,
  imageData,
  error,
  onReset,
  onRetry,
}: GenerateResultProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isLoading]);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20"
      >
        <Loader2 className="mb-6 h-12 w-12 animate-spin text-[var(--gold)]" />
        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="text-xl font-medium text-[var(--warm-brown)]"
          >
            {loadingMessages[messageIndex]}
          </motion.p>
        </AnimatePresence>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center py-12"
      >
        <p className="mb-2 text-xl font-bold text-[var(--warm-brown)]">Ups!</p>
        <p className="mb-6 text-[var(--warm-brown)]/60">{error}</p>
        <button
          onClick={onRetry}
          className="flex items-center gap-2 rounded-xl bg-[var(--gold)] px-6 py-3 font-semibold text-white hover:bg-[var(--gold)]/90"
        >
          <RotateCcw className="h-4 w-4" />
          Prøv igen
        </button>
      </motion.div>
    );
  }

  if (!imageData) return null;

  const dataUrl = `data:${imageData.mimeType};base64,${imageData.image}`;

  function handleDownload() {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "min-drommekage.png";
    a.click();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center"
    >
      <h2 className="mb-2 text-2xl font-bold text-[var(--warm-brown)]">Din drømmekage!</h2>
      <p className="mb-6 text-[var(--warm-brown)]/60">
        Her er hvad AI&apos;en forestiller sig
      </p>

      <motion.img
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        src={dataUrl}
        alt="Genereret kage"
        className="w-full max-w-lg rounded-2xl shadow-xl"
      />

      <div className="mt-6 flex gap-3">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 rounded-xl bg-[var(--gold)] px-6 py-3 font-semibold text-white hover:bg-[var(--gold)]/90"
        >
          <Download className="h-4 w-4" />
          Download billede
        </button>
        <button
          onClick={onReset}
          className="flex items-center gap-2 rounded-xl border-2 border-[var(--warm-brown)]/15 px-6 py-3 font-semibold text-[var(--warm-brown)] hover:bg-[var(--warm-brown)]/5"
        >
          <RotateCcw className="h-4 w-4" />
          Byg en ny kage
        </button>
      </div>
    </motion.div>
  );
}
