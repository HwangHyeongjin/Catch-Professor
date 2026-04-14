import { useEffect, useState } from 'react';

interface CountdownModalProps {
  prof1Name: string;
  prof2Name: string;
  onComplete: () => void;
}

export default function CountdownModal({ prof1Name, prof2Name, onComplete }: CountdownModalProps) {
  const [count, setCount] = useState(3);
  const [phase, setPhase] = useState<'count' | 'go'>('count');

  const profText = prof2Name ? `${prof1Name}, ${prof2Name} 교수님` : `${prof1Name} 교수님`;

  useEffect(() => {
    if (phase === 'count') {
      if (count <= 0) {
        setPhase('go');
        return;
      }
      const t = setTimeout(() => setCount((c) => c - 1), 900);
      return () => clearTimeout(t);
    } else {
      // "시작!" 표시 후 0.6초 뒤 게임 시작
      const t = setTimeout(onComplete, 600);
      return () => clearTimeout(t);
    }
  }, [count, phase, onComplete]);

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-6"
      style={{ background: 'rgba(10,14,30,0.88)', backdropFilter: 'blur(6px)' }}
    >
      {/* 멘트 */}
      <p
        className="text-lg font-bold text-center px-6 leading-snug"
        style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 340 }}
      >
        당신을 화나게 한<br />
        <span style={{ color: '#F4D03F' }}>{profText}</span>을<br />
        잡아보세요!
      </p>

      {/* 카운트 숫자 */}
      <div
        key={phase === 'go' ? 'go' : count}
        className="flex items-center justify-center rounded-full"
        style={{
          width: 140,
          height: 140,
          background: phase === 'go'
            ? 'linear-gradient(135deg,#F4D03F,#F39C12)'
            : 'rgba(255,255,255,0.06)',
          border: `3px solid ${phase === 'go' ? '#F4D03F' : 'rgba(255,255,255,0.15)'}`,
          boxShadow: phase === 'go' ? '0 0 40px rgba(244,208,63,0.5)' : '0 0 20px rgba(255,255,255,0.05)',
          animation: 'countdown-pop 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        {phase === 'go' ? (
          <span className="text-4xl font-black" style={{ color: '#1a1a2e' }}>시작!</span>
        ) : (
          <span className="text-7xl font-black" style={{ color: 'white' }}>{count}</span>
        )}
      </div>

      <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
        준비하세요...
      </p>

      <style>{`
        @keyframes countdown-pop {
          0%   { transform: scale(0.5); opacity: 0; }
          70%  { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1);   opacity: 1; }
        }
      `}</style>
    </div>
  );
}
