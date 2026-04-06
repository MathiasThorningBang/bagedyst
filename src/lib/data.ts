import type { Option } from "./types";

export const kageTyper: Option[] = [
  { id: "lagkage", name: "Lagkage", description: "Klassisk dansk lagkage med creme og bær", emoji: "🎂" },
  { id: "drommekage", name: "Drømmekage", description: "Kokos-karamel topping fra Brovst", emoji: "✨" },
  { id: "brownie", name: "Brownie-kage", description: "Tung, fudgy chokoladekage", emoji: "🍫" },
  { id: "gulerodskage", name: "Gulerodskage", description: "Saftig med flødeost-frosting", emoji: "🥕" },
  { id: "mousse", name: "Moussekage", description: "Let og luftig entremet", emoji: "☁️" },
  { id: "kransekage", name: "Kransekage", description: "Marcipanringe stablet i tårn", emoji: "🏰" },
  { id: "cupcakes", name: "Cupcakes", description: "Små fine kager med topping", emoji: "🧁" },
  { id: "brudelagkage", name: "Brudelagkage", description: "Elegant flerlagskage til bryllup", emoji: "💒" },
];

export const smage: Option[] = [
  { id: "chokolade", name: "Chokolade", color: "#5C3A1E" },
  { id: "vanilje", name: "Vanilje", color: "#FEF3C7" },
  { id: "citron", name: "Citron", color: "#FDE68A" },
  { id: "hindbaer", name: "Hindbær", color: "#F472B6" },
  { id: "jordbaer", name: "Jordbær", color: "#EF4444" },
  { id: "karamel", name: "Karamel", color: "#D97706" },
  { id: "pistacie", name: "Pistacie", color: "#86EFAC" },
  { id: "kokos", name: "Kokos", color: "#F5F5F0" },
  { id: "aeble-kanel", name: "Æble & Kanel", color: "#B45309" },
  { id: "passion", name: "Passionsfrugt", color: "#FCD34D" },
];

export const ingredienser: Option[] = [
  { id: "marcipan", name: "Marcipan", emoji: "🟡" },
  { id: "noedder", name: "Nødder", emoji: "🥜" },
  { id: "baer", name: "Friske bær", emoji: "🍓" },
  { id: "creme", name: "Flødecreme", emoji: "🍦" },
  { id: "ganache", name: "Chokolade-ganache", emoji: "🍫" },
  { id: "frugt", name: "Frisk frugt", emoji: "🍊" },
  { id: "floedost", name: "Flødeost-frosting", emoji: "🧀" },
  { id: "karamel-sauce", name: "Karamelsauce", emoji: "🍯" },
  { id: "meringue", name: "Marengs", emoji: "☁️" },
  { id: "jam", name: "Syltetøj", emoji: "🫙" },
];

export const pyntStile: Option[] = [
  { id: "fondant", name: "Fondant", description: "Glat, elegant finish", emoji: "🎨" },
  { id: "smoercreme", name: "Smørcreme-swirls", description: "Bløde, dekorative swirls", emoji: "🌀" },
  { id: "frugt-deko", name: "Frugt-dekoration", description: "Friske frugter og bær", emoji: "🍇" },
  { id: "blomster", name: "Spiselige blomster", description: "Elegante blomsterdekorationer", emoji: "🌸" },
  { id: "drys", name: "Drys & krymmel", description: "Farverigt og festligt", emoji: "🎉" },
  { id: "glasur", name: "Spejlglasur", description: "Skinnende, perfekt glasur", emoji: "✨" },
];

export const anledninger: Option[] = [
  { id: "foedselsdag", name: "Fødselsdag", emoji: "🎈" },
  { id: "bryllup", name: "Bryllup", emoji: "💍" },
  { id: "barnedaab", name: "Barnedåb", emoji: "👶" },
  { id: "jul", name: "Jul", emoji: "🎄" },
  { id: "dimission", name: "Dimission", emoji: "🎓" },
  { id: "ingen", name: "Ingen anledning", emoji: "🍰" },
];

export function getOptionName(id: string, options: Option[]): string {
  return options.find((o) => o.id === id)?.name ?? id;
}
