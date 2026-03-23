import type { WordEntry } from "../words";
import { WORD_LIST } from "../words";

export function getRandomWord(): WordEntry {
  const index = Math.floor(Math.random() * WORD_LIST.length);
  return WORD_LIST[index];
}

export function pickRandomImposters(
  players: string[],
  count: number
): string[] {
  const shuffled = [...players].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, players.length));
}
