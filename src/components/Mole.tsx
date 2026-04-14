import { useState } from 'react';
import { MoleState } from '../types/game';
import ProfessorIcon from './ProfessorIcon';
import BombIcon from './BombIcon';

export type HoleSize = 'xs' | 'sm' | 'md' | 'lg' | 'desktop';

interface MoleProps {
  mole: MoleState;
  prof1Name: string;
  prof2Name: string;
  onHit: (id: number) => void;
  onMiss: () => void;
  holeSize?: HoleSize;
}

const HOLE_SIZES: Record<HoleSize, { hole: number; icon: number; height: number }> = {
  xs:      { hole: 80,  icon: 58,  height: 100 },
  sm:      { hole: 100, icon: 74,  height: 120 },
  md:      { hole: 122, icon: 92,  height: 148 },
  lg:      { hole: 148, icon: 112, height: 178 },
  desktop: { hole: 100, icon: 76,  height: 122 }, // 4x4 화면 맞춤
};

export default function Mole({ mole, prof1Name, prof2Name, onHit, onMiss, holeSize = 'md' }: MoleProps) {
  const [showScore, setShowScore] = useState(false);
  const [scoreLabel, setScoreLabel] = useState('+100');
  const { hole, icon, height } = HOLE_SIZES[holeSize];

  const isBomb = mole.moleType === 'bomb';
  const profType = mole.moleType === 'prof2' ? 'gray' : 'bald';
  const displayName = mole.moleType === 'prof2' ? prof2Name : prof1Name;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 항상 버블링 차단 (빈 곳 클릭과 중복 방지)
    if (mole.isVisible && !mole.isHit) {
      onHit(mole.id);
      setScoreLabel(isBomb ? '-50' : '+100');
      setShowScore(true);
      setTimeout(() => setShowScore(false), 600);
    } else {
      // 구멍 클릭했는데 두더지 없음 → 미스
      onMiss();
    }
  };

  return (
    <div
      className="relative flex flex-col items-center justify-end cursor-pointer select-none"
      style={{ height }}
      onClick={handleClick}
    >
      {/* 점수 플로팅 */}
      {showScore && (
        <div className="score-float absolute -top-3 left-1/2 font-black text-lg z-20 pointer-events-none"
          style={{ transform: 'translateX(-50%)', color: isBomb ? '#E74C3C' : '#2ECC71', textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>
          {scoreLabel}
        </div>
      )}

      {/* 구멍 */}
      <div className="absolute bottom-0 left-1/2 rounded-full z-0"
        style={{ width: hole, height: Math.round(hole * 0.28), transform: 'translateX(-50%)', background: 'radial-gradient(ellipse,#04040f 40%,#111128 100%)', border: '1.5px solid rgba(255,255,255,0.05)' }} />

      {/* 잔디 */}
      <div className="absolute bottom-0 left-1/2 z-10 rounded-full"
        style={{ width: hole, height: Math.round(hole * 0.14), transform: 'translateX(-50%)', background: 'linear-gradient(to bottom,#27AE60,#1e8449)' }} />

      {/* 아이콘 */}
      <div className={`relative z-10 ${mole.isVisible ? 'mole-enter' : mole.isHit ? 'mole-exit' : 'opacity-0 pointer-events-none'}`}
        style={{ marginBottom: 5 }}>
        <div className={mole.isHit ? 'hit-flash' : ''}>
          {isBomb ? <BombIcon size={icon} isHit={mole.isHit} /> : <ProfessorIcon type={profType} size={icon} isHit={mole.isHit} />}
        </div>
        {mole.isVisible && !mole.isHit && (
          <div className="absolute -top-8 left-1/2 text-xs font-bold whitespace-nowrap px-2 py-0.5 rounded-full"
            style={{ transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.75)', color: isBomb ? '#E74C3C' : '#F4D03F', border: `1px solid ${isBomb ? 'rgba(231,76,60,0.5)' : 'rgba(244,208,63,0.4)'}` }}>
            {isBomb ? '⚠ 꽝!' : displayName}
          </div>
        )}
      </div>
    </div>
  );
}
