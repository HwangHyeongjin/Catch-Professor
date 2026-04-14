import { useState, useEffect, useRef, useCallback } from 'react';
import {
  GamePhase, MoleState, MoleType,
  GRID_SIZE, GAME_DURATION, SCORE_HIT, SCORE_PENALTY, getSpeedConfig,
} from '../types/game';

const initMoles = (): MoleState[] =>
  Array.from({ length: GRID_SIZE }, (_, i) => ({
    id: i, isVisible: false, isHit: false, moleType: 'prof1' as MoleType,
  }));

function randomMoleType(hasTwoProfs: boolean): MoleType {
  const r = Math.random();
  if (r < 0.18) return 'bomb';
  if (hasTwoProfs && r < 0.59) return 'prof2';
  return 'prof1';
}

export function useGameLogic(prof1Name: string, prof2Name: string) {
  const [phase, setPhase] = useState<GamePhase>('start');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [moles, setMoles] = useState<MoleState[]>(initMoles());
  const [missShake, setMissShake] = useState(false);

  const phaseRef   = useRef<GamePhase>('start');
  const timeLeftRef = useRef(GAME_DURATION);
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const spawnRef   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const moleTimers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());
  const hasTwoProfs = prof2Name.trim().length > 0;

  const clearAll = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (spawnRef.current) clearTimeout(spawnRef.current);
    moleTimers.current.forEach((t) => clearTimeout(t));
    moleTimers.current.clear();
  }, []);

  const hideMole = useCallback((id: number) => {
    setMoles((prev) => prev.map((m) => m.id === id ? { ...m, isVisible: false, isHit: false } : m));
  }, []);

  const spawnMoles = useCallback(() => {
    const { visibleMs } = getSpeedConfig(timeLeftRef.current);
    setMoles((prev) => {
      const hidden = prev.filter((m) => !m.isVisible).map((m) => m.id);
      if (hidden.length === 0) return prev;
      const count = Math.min(Math.floor(Math.random() * 3) + 1, hidden.length, 4);
      const toShow = [...hidden].sort(() => Math.random() - 0.5).slice(0, count);
      const next = prev.map((m) =>
        toShow.includes(m.id) ? { ...m, isVisible: true, isHit: false, moleType: randomMoleType(hasTwoProfs) } : m
      );
      toShow.forEach((id) => {
        if (moleTimers.current.has(id)) clearTimeout(moleTimers.current.get(id)!);
        const t = setTimeout(() => hideMole(id), visibleMs);
        moleTimers.current.set(id, t);
      });
      return next;
    });
  }, [hideMole, hasTwoProfs]);

  const scheduleNextSpawn = useCallback(() => {
    if (phaseRef.current !== 'playing') return;
    const { spawnMs } = getSpeedConfig(timeLeftRef.current);
    spawnRef.current = setTimeout(() => {
      if (phaseRef.current === 'playing') { spawnMoles(); scheduleNextSpawn(); }
    }, spawnMs);
  }, [spawnMoles]);

  const startGame = useCallback(() => {
    clearAll();
    phaseRef.current = 'playing';
    timeLeftRef.current = GAME_DURATION;
    setScore(0); setTimeLeft(GAME_DURATION); setMoles(initMoles()); setPhase('playing');
  }, [clearAll]);

  const pauseGame = useCallback(() => {
    phaseRef.current = 'paused'; setPhase('paused'); clearAll();
  }, [clearAll]);

  const resumeGame = useCallback(() => {
    phaseRef.current = 'playing'; setPhase('playing');
  }, []);

  const endGame = useCallback(() => {
    clearAll(); phaseRef.current = 'end'; setMoles(initMoles()); setPhase('end');
  }, [clearAll]);

  const hitMole = useCallback((id: number) => {
    setMoles((prev) => {
      const mole = prev.find((m) => m.id === id);
      if (!mole || !mole.isVisible || mole.isHit) return prev;
      const delta = mole.moleType === 'bomb' ? SCORE_PENALTY : SCORE_HIT;
      setScore((s) => Math.max(0, s + delta));
      if (moleTimers.current.has(id)) clearTimeout(moleTimers.current.get(id)!);
      const t = setTimeout(() => hideMole(id), 280);
      moleTimers.current.set(id, t);
      return prev.map((m) => m.id === id ? { ...m, isHit: true } : m);
    });
  }, [hideMole]);

  // 빈 곳 클릭 -50점
  const missMole = useCallback(() => {
    setScore((s) => Math.max(0, s + SCORE_PENALTY));
    setMissShake(true);
    setTimeout(() => setMissShake(false), 300);
  }, []);

  useEffect(() => {
    if (phase !== 'playing') return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        const next = t - 1;
        timeLeftRef.current = next;
        if (next <= 0) endGame();
        return next;
      });
    }, 1000);
    scheduleNextSpawn();
    return () => { if (timerRef.current) clearInterval(timerRef.current); if (spawnRef.current) clearTimeout(spawnRef.current); };
  }, [phase, scheduleNextSpawn, endGame]);

  return { phase, score, timeLeft, moles, missShake, startGame, pauseGame, resumeGame, hitMole, missMole };
}
