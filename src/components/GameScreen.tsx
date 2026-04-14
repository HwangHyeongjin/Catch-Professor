import { useCallback, useEffect, useState } from 'react';
import { GAME_DURATION } from '../types/game';
import { useGameLogic } from '../hooks/useGameLogic';
import MoleGrid from './MoleGrid';
import CountdownModal from './CountdownModal';

interface GameScreenProps {
  prof1Name: string;
  prof2Name: string;
  onEnd: (score: number) => void;
  onHome: () => void;
}

function useIsDesktop() {
  const [v, setV] = useState(() => window.innerWidth >= 768);
  useEffect(() => {
    const h = () => setV(window.innerWidth >= 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return v;
}

function formatTime(s: number) {
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

export default function GameScreen({ prof1Name, prof2Name, onEnd, onHome }: GameScreenProps) {
  const isDesktop = useIsDesktop();
  const [showCountdown, setShowCountdown] = useState(true);

  const {
    phase, score, timeLeft, moles, missShake,
    startGame, pauseGame, resumeGame, hitMole, missMole,
  } = useGameLogic(prof1Name, prof2Name);

  // 카운트다운 완료 → 게임 즉시 시작
  const handleCountdownComplete = useCallback(() => {
    setShowCountdown(false);
    startGame();
  }, [startGame]);

  if (phase === 'end') { onEnd(score); return null; }

  const timePercent = (timeLeft / GAME_DURATION) * 100;
  const timeColor = timeLeft > 30 ? '#2ECC71' : timeLeft > 10 ? '#F39C12' : '#E74C3C';
  const isPaused = phase === 'paused';

  const PauseBtn = () => (
    <button
      onClick={isPaused ? resumeGame : pauseGame}
      className="flex items-center justify-center rounded-2xl transition-all active:scale-95"
      style={{ width: 56, height: 56, background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.12)' }}
    >
      {isPaused
        ? <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
        : <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><rect x="5" y="3" width="4" height="18" rx="2" /><rect x="15" y="3" width="4" height="18" rx="2" /></svg>}
    </button>
  );

  const PauseOverlay = () => (
    <div className="absolute inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(4px)' }}>
      <div className="rounded-3xl px-12 py-10 flex flex-col items-center gap-5"
        style={{ background: 'rgba(22,33,62,0.96)', border: '1.5px solid rgba(255,255,255,0.12)' }}>
        <span className="text-3xl font-black text-white">일시정지</span>
        <span className="text-5xl font-black" style={{ color: '#F4D03F' }}>{score.toLocaleString()}점</span>
        <div className="flex flex-col gap-3 w-56">
          <button onClick={resumeGame} className="py-3 rounded-xl font-black text-lg active:scale-95"
            style={{ background: 'linear-gradient(135deg,#F4D03F,#F39C12)', color: '#1a1a2e' }}>계속하기</button>
          <button onClick={() => { startGame(); setShowCountdown(false); }} className="py-3 rounded-xl font-black text-lg active:scale-95"
            style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>다시하기</button>
          <button onClick={onHome} className="py-2.5 rounded-xl font-bold text-sm active:scale-95"
            style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.45)' }}>처음으로</button>
        </div>
      </div>
    </div>
  );

  const bg = 'linear-gradient(180deg,#0d1b3e 0%,#1a3a5c 40%,#0f3460 100%)';

  // ── 데스크탑 ──────────────────────────────────────────
  if (isDesktop) {
    return (
      <div
        className="relative flex flex-col overflow-hidden"
        style={{ height: '100vh', background: bg, cursor: 'crosshair' }}
        onClick={missMole}
      >
        {/* 카운트다운 모달 */}
        {showCountdown && (
          <CountdownModal prof1Name={prof1Name} prof2Name={prof2Name} onComplete={handleCountdownComplete} />
        )}

        {/* HUD - 압축 */}
        <div
          className="relative z-10 flex items-center justify-between px-10 py-3 flex-shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3 rounded-2xl px-5 py-2.5"
            style={{ background: 'rgba(0,0,0,0.45)', border: '1.5px solid rgba(255,255,255,0.1)' }}>
            <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.5)' }}>시간</span>
            <span className="text-3xl font-black"
              style={{ color: timeColor, fontVariantNumeric: 'tabular-nums', minWidth: 95 }}>
              ({formatTime(timeLeft)})
            </span>
            <div className="w-28 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <div className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${timePercent}%`, background: timeColor }} />
            </div>
          </div>
          <div onClick={(e) => e.stopPropagation()}><PauseBtn /></div>
        </div>

        {/* 점수 표지판 - 압축 */}
        <div className="relative z-10 flex flex-col items-center flex-shrink-0 pointer-events-none">
          <div className="px-10 py-2.5 rounded-xl flex flex-col items-center"
            style={{ background: 'rgba(244,208,63,0.10)', border: '2px solid rgba(244,208,63,0.45)', minWidth: 200 }}>
            <span className="text-xs font-bold" style={{ color: 'rgba(244,208,63,0.55)' }}>점수 표지판</span>
            <span className="text-4xl font-black" style={{ color: '#F4D03F' }}>{score.toLocaleString()}</span>
          </div>
          <div style={{ width: 8, height: 28, background: 'rgba(244,208,63,0.35)', borderRadius: 4 }} />
        </div>

        {/* 무대 배경 (장식) */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '50%' }}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 500" preserveAspectRatio="none">
            <path d="M0,160 Q720,0 1440,160 L1440,500 L0,500 Z"
              fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
            <ellipse cx="720" cy="420" rx="700" ry="65"
              fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" />
          </svg>
        </div>

        {/* 4x4 그리드 - flex-1 min-h-0으로 남은 공간만 사용 */}
        <div
          className="relative z-10 flex items-center justify-center flex-1 min-h-0 pb-6"
          onClick={(e) => e.stopPropagation()}
        >
          <MoleGrid
            moles={moles} prof1Name={prof1Name} prof2Name={prof2Name}
            onHit={hitMole} onMiss={missMole} missShake={missShake} isDesktop={true}
          />
        </div>

        <div className="absolute bottom-2 left-1/2 text-xs z-10 pointer-events-none flex-shrink-0"
          style={{ transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.18)' }}>
          교수님 +100 · 꽝/빈곳 클릭 -50 · 시간이 줄수록 빨라집니다
        </div>

        {isPaused && <PauseOverlay />}
      </div>
    );
  }

  // ── 모바일 ──────────────────────────────────────────
  return (
    <div className="relative flex flex-col min-h-screen" onClick={missMole}
      style={{ background: bg, cursor: 'crosshair' }}>

      {showCountdown && (
        <CountdownModal prof1Name={prof1Name} prof2Name={prof2Name} onComplete={handleCountdownComplete} />
      )}

      <div className="flex items-center justify-between px-4 pt-5 pb-3 gap-3" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col items-center rounded-2xl px-4 py-2 min-w-[88px]"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.1)' }}>
          <span className="text-xs font-semibold mb-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>시간</span>
          <span className="text-2xl font-black" style={{ color: timeColor, fontVariantNumeric: 'tabular-nums' }}>{formatTime(timeLeft)}</span>
          <div className="w-full h-1.5 rounded-full mt-1 overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${timePercent}%`, background: timeColor }} />
          </div>
        </div>
        <div className="flex flex-col items-center rounded-2xl px-4 py-2 flex-1"
          style={{ background: 'rgba(244,208,63,0.1)', border: '1.5px solid rgba(244,208,63,0.25)' }}>
          <span className="text-xs font-semibold mb-0.5" style={{ color: 'rgba(244,208,63,0.6)' }}>점수 표지판</span>
          <span className="text-3xl font-black" style={{ color: '#F4D03F' }}>{score.toLocaleString()}</span>
        </div>
        <div onClick={(e) => e.stopPropagation()}><PauseBtn /></div>
      </div>

      <div className="flex-1 flex items-center justify-center px-3" onClick={(e) => e.stopPropagation()}>
        <MoleGrid moles={moles} prof1Name={prof1Name} prof2Name={prof2Name}
          onHit={hitMole} onMiss={missMole} missShake={missShake} isDesktop={false} />
      </div>

      <div className="text-center pb-4 text-xs pointer-events-none" style={{ color: 'rgba(255,255,255,0.22)' }}>
        교수님 +100 · 꽝/빈곳 -50 · 놓쳐도 0점
      </div>

      {isPaused && <PauseOverlay />}
    </div>
  );
}
