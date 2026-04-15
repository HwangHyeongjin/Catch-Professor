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
  // 전 구간 10% 상향, 마지막 10초 추가 10% 가중
  if (timeLeft > 45) return { visibleMs: 1440, spawnMs: 1080 };
  if (timeLeft > 30) return { visibleMs: 1170, spawnMs: 855 };
  if (timeLeft > 15) return { visibleMs: 900,  spawnMs: 648 };
  if (timeLeft > 10) return { visibleMs: 666,  spawnMs: 468 };
  return                     { visibleMs: 600,  spawnMs: 420 }; // 마지막 10초 추가 10%
}
