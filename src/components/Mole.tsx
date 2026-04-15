import { useState } from 'react';
import { MoleState } from '../types/game';
import ProfessorIcon from './ProfessorIcon';
import BombIcon from './BombIcon';

const PROF_MESSAGES = [
  '아얏 교수를 때리다니!',
  '자네 지금 뭐하는 건가!',
  '이런다고 과제가 없어지지 않는다네!',
  '그건 내 가발이야!',
  '자꾸 그러면 대학원 추천 서류를 써주겠네!',
  '벚꽃의 꽃말은 중간고사지!',
];

const BOMB_MESSAGES = [
  '저는 학생인데요...?',
  '챗지피티가 그거 맞다고 했어요',
  '자료조사는 싫고, 발표는 못해요',
  '잘못했어요 대학원만은 제발...!',
];

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
  const [bubble, setBubble] = useState<string | null>(null);
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
      if (Math.random() < 0.3) {
        const msgs = isBomb ? BOMB_MESSAGES : PROF_MESSAGES;
        const msg = msgs[Math.floor(Math.random() * msgs.length)];
        setBubble(msg);
        setTimeout(() => setBubble(null), 1800);
      }
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

      {/* 말풍선 */}
      {bubble && (
        <div className="absolute z-30 pointer-events-none"
          style={{ bottom: height - 10, left: '50%', transform: 'translateX(-50%)', animation: 'bubblePop 0.2s ease-out' }}>
          <div className="relative px-3 py-1.5 rounded-2xl text-xs font-bold whitespace-nowrap"
            style={{
              background: 'white',
              color: '#1a1a2e',
              boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
              maxWidth: 180,
              whiteSpace: 'normal',
              textAlign: 'center',
              lineHeight: 1.4,
            }}>
            {bubble}
            {/* 말풍선 꼬리 */}
            <div style={{
              position: 'absolute',
              bottom: -7,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '7px solid transparent',
              borderRight: '7px solid transparent',
              borderTop: '8px solid white',
            }} />
          </div>
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
