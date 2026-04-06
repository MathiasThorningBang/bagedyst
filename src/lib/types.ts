export interface CakeConfig {
  kageType: string | null;
  smag: string | null;
  ingredienser: string[];
  pynt: string | null;
  tekstPaaKage: string;
  anledning: string | null;
}

export type WizardStep =
  | "landing"
  | "kage-type"
  | "smag"
  | "pynt"
  | "tekst"
  | "anledning"
  | "overblik"
  | "genererer";

export const defaultConfig: CakeConfig = {
  kageType: null,
  smag: null,
  ingredienser: [],
  pynt: null,
  tekstPaaKage: "",
  anledning: null,
};

export interface Option {
  id: string;
  name: string;
  description?: string;
  emoji?: string;
  color?: string;
}
