import type { WordEntry } from "../words";

export interface GameOptions {
  showCategoryToImposter: boolean;
  showHintToImposter: boolean;
}

export interface GameState {
  wordEntry: WordEntry;
  imposters: string[];
  options: GameOptions;
}
