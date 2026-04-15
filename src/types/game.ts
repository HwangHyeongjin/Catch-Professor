export type GamePhase = 'start' | 'playing' | 'paused' | 'end';
export type MoleType = 'prof1' | 'prof2' | 'bomb';

export interface MoleState {
  id: number;
  isVisible: boolean;
  isHit: boolean;
  moleType: MoleType;
}

export const GRID_SIZE = 16; // 4x4
export const GAME_DURATION = 60;
export const SCORE_HIT = 100;
export const SCORE_PENALTY = -50; // 꽝 클릭 or 빈 곳 클릭

export function getSpeedConfig(timeLeft: number): { visibleMs: number; spawnMs: number } {
  if (timeLeft > 45) return { visibleMs: 1600, spawnMs: 1200 };
  if (timeLeft > 30) return { visibleMs: 1300, spawnMs: 950 };
  if (timeLeft > 15) return { visibleMs: 1000, spawnMs: 720 };
  return { visibleMs: 740, spawnMs: 520 };
}
