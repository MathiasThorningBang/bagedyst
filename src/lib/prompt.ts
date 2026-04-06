import type { CakeConfig } from "./types";
import { kageTyper, smage, ingredienser, pyntStile, anledninger, getOptionName } from "./data";

export function buildCakePrompt(config: CakeConfig): string {
  const kageNavn = config.kageType ? getOptionName(config.kageType, kageTyper) : "kage";
  const smagNavn = config.smag ? getOptionName(config.smag, smage) : "klassisk";
  const pyntNavn = config.pynt ? getOptionName(config.pynt, pyntStile) : "enkel dekoration";

  const ingrediensListe = config.ingredienser
    .map((id) => getOptionName(id, ingredienser))
    .join(", ");

  const anledningNavn =
    config.anledning && config.anledning !== "ingen"
      ? getOptionName(config.anledning, anledninger)
      : null;

  const lines = [
    `Create a photorealistic, appetizing image of a beautiful Danish-style ${kageNavn}.`,
    "",
    "Key characteristics:",
    `- Primary flavor: ${smagNavn}`,
    `- Key ingredients visible or suggested: ${ingrediensListe || "classic ingredients"}`,
    `- Decoration style: ${pyntNavn}`,
  ];

  if (config.tekstPaaKage) {
    lines.push(
      `- The cake has the text "${config.tekstPaaKage}" written on it in elegant frosting/icing lettering.`
    );
  }

  if (anledningNavn) {
    lines.push(
      `- The cake is designed for a ${anledningNavn} celebration, with appropriate thematic decoration.`
    );
  }

  lines.push(
    "",
    "Style requirements:",
    "- Shot from a slightly elevated 3/4 angle, as if photographed for a premium baking magazine",
    "- Soft, warm natural lighting from the left",
    "- The cake sits on a simple, elegant cake stand or plate",
    "- Clean, minimal background (marble surface or light wood table)",
    "- Photorealistic, high detail, sharp focus on the cake",
    "- The cake should look professionally made but approachable, like from Den Store Bagedyst",
    "- Vibrant, appetizing colors true to the ingredients",
    "- DO NOT include any people, hands, or utensils in the image"
  );

  return lines.join("\n");
}
