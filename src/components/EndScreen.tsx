import { useEffect, useState } from 'react';
import ProfessorIcon from './ProfessorIcon';
import { saveScore, getSchoolTopScores, getGlobalTopScores, ScoreEntry } from '../lib/ranking';

interface EndScreenProps {
  score: number;
  prof1Name: string;
  prof2Name: string;
  playerName: string;
  school: string;
  onRestart: () => void;
  onHome: () => void;
}

function getGrade(s: number) {
  if (s >= 7500) return { grade: '최상', color: '#F4D03F', message: '으아악! 이렇게 다쳐서는... 오늘은 휴강일세...' };
  if (s >= 5000) return { grade: '상',   color: '#2ECC71', message: '대단하구만! A+는 자네 거야!' };
  if (s >= 2500) return { grade: '중',   color: '#3498DB', message: '그정도로는 A는 어림도 없네...' };
  return           { grade: '하',   color: '#E74C3C', message: '자네는 아무래도 재수강을 해야...' };
}

function medalBg(r: number) {
  if (r === 1) return '#F4D03F';
  if (r === 2) return '#BDC3C7';
  if (r === 3) return '#CD7F32';
  return 'rgba(255,255,255,0.08)';
}

function RankList({ entries, myScore, school, tab }: { entries: ScoreEntry[]; myScore: number; school: string; tab: 'school' | 'global' }) {
  if (entries.length === 0) return (
    <p className="text-xs text-center py-6" style={{ color: 'rgba(255,255,255,0.3)' }}>아직 기록이 없습니다</p>
  );
  return (
    <>
      {entries.map((e, i) => {
        const rank = i + 1;
        const isMe = e.score === myScore && i === entries.findIndex(x => x.score === myScore);
        const color = isMe ? getGrade(myScore).color : undefined;
        return (
          <div key={e.id} className="flex items-center gap-3 px-3 py-2 rounded-xl"
            style={{ background: isMe ? `${color}18` : 'transparent', border: isMe ? `1px solid ${color}40` : '1px solid transparent' }}>
            <div className="w-7 h-7 flex items-center justify-center rounded-full text-xs font-black flex-shrink-0"
              style={{ background: medalBg(rank), color: rank <= 3 ? '#1a1a2e' : 'rgba(255,255,255,0.5)' }}>
              {rank}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-semibold truncate" style={{ color: isMe ? color : 'rgba(255,255,255,0.8)' }}>
                {e.player_name}{isMe && <span className="ml-1 text-xs opacity-60">(나)</span>}
              </span>
              {tab === 'global' && (
                <span className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.3)' }}>{e.school}</span>
              )}
            </div>
            <span className="text-sm font-black flex-shrink-0" style={{ color: isMe ? color : 'rgba(255,255,255,0.45)' }}>
              {e.score.toLocaleString()}
            </span>
          </div>
        );
      })}
    </>
  );
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

export default function EndScreen({ score, prof1Name, prof2Name, playerName, school, onRestart, onHome }: EndScreenProps) {
  const isDesktop = useIsDesktop();
  const { grade, color, message } = getGrade(score);
  const [tab, setTab] = useState<'school' | 'global'>('school');
  const [schoolRanking, setSchoolRanking] = useState<ScoreEntry[]>([]);
  const [globalRanking, setGlobalRanking] = useState<ScoreEntry[]>([]);
  const [mySchoolRank, setMySchoolRank] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const profNames = prof2Name ? `${prof1Name} / ${prof2Name}` : prof1Name;

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        await saveScore({ school, playerName, profNames, score });
        const [schoolData, globalData] = await Promise.all([
          getSchoolTopScores(school, 10),
          getGlobalTopScores(10),
        ]);
        if (cancelled) return;
        setSchoolRanking(schoolData);
        setGlobalRanking(globalData);
        const rank = schoolData.findIndex((e) => e.score <= score);
        setMySchoolRank(rank === -1 ? schoolData.length + 1 : rank + 1);
      } catch {
        if (!cancelled) setError('랭킹 저장/로드 실패.\nSupabase SQL Editor에서 scores 테이블을 생성했는지 확인해주세요.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const currentRanking = tab === 'school' ? schoolRanking : globalRanking;

  const ResultCard = () => (
    <div className="w-full max-w-sm rounded-2xl p-5 flex flex-col items-center gap-3"
      style={{ background: 'rgba(255,255,255,0.06)', border: `1.5px solid ${color}40` }}>
      <div className="flex items-center gap-5">
        <ProfessorIcon type="bald" size={isDesktop ? 80 : 64} />
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs font-bold px-3 py-0.5 rounded-full"
            style={{ background: `${color}25`, color, border: `1px solid ${color}50` }}>{grade} 등급</span>
          <span className="text-5xl font-black" style={{ color }}>{score.toLocaleString()}</span>
          <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.5)' }}>점</span>
        </div>
        <ProfessorIcon type="gray" size={isDesktop ? 80 : 64} />
      </div>
      <p className="text-sm text-center font-semibold" style={{ color: 'rgba(255,255,255,0.65)' }}>{message}</p>
      {mySchoolRank !== null && (
        <p className="text-sm font-bold" style={{ color }}>
          {school} 내 순위: {mySchoolRank}등 (내 앞에 {mySchoolRank - 1}명)
        </p>
      )}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen" style={{ background: 'linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)' }}>
      <div className={`flex ${isDesktop ? 'flex-row' : 'flex-col'} flex-1 overflow-hidden`}>

        {/* 결과 패널 */}
        <div className={`flex flex-col items-center justify-center gap-5 p-6 ${isDesktop ? 'flex-1' : ''}`}>
          <h1 className="text-3xl font-black text-white">게임 종료</h1>
          <ResultCard />
          <div className="flex gap-3 w-full max-w-sm">
            <button onClick={onHome} className="flex-1 py-4 rounded-xl font-bold text-base active:scale-95"
              style={{ background: 'rgba(255,255,255,0.08)', color: 'white', border: '1.5px solid rgba(255,255,255,0.15)' }}>처음으로</button>
            <button onClick={onRestart} className="flex-1 py-4 rounded-xl font-black text-base active:scale-95"
              style={{ background: 'linear-gradient(135deg,#F4D03F,#F39C12)', color: '#1a1a2e', boxShadow: '0 4px 20px rgba(244,208,63,0.35)' }}>다시하기</button>
          </div>
        </div>

        {/* 랭킹 패널 */}
        <div className={`flex flex-col gap-2 p-5 ${isDesktop ? 'w-80 flex-shrink-0' : 'mx-4 mb-4'}`}
          style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 20, border: '1.5px solid rgba(255,255,255,0.08)' }}>

          {/* 탭 */}
          <div className="flex rounded-xl overflow-hidden mb-1" style={{ background: 'rgba(255,255,255,0.06)' }}>
            {(['school', 'global'] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className="flex-1 py-2 text-sm font-bold transition-all"
                style={{ background: tab === t ? color : 'transparent', color: tab === t ? '#1a1a2e' : 'rgba(255,255,255,0.4)', borderRadius: 10 }}>
                {t === 'school' ? `🏫 ${school}` : '🌐 전체'}
              </button>
            ))}
          </div>

          {loading && (
            <div className="flex flex-col items-center gap-2 py-8">
              <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
                style={{ borderColor: `${color} transparent transparent transparent` }} />
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>저장 중...</span>
            </div>
          )}

          {error && (
            <p className="text-xs text-center py-4 whitespace-pre-line" style={{ color: '#E74C3C' }}>{error}</p>
          )}

          {!loading && !error && (
            <div className="flex flex-col gap-1 overflow-y-auto" style={{ maxHeight: isDesktop ? 'none' : 280 }}>
              <RankList entries={currentRanking} myScore={score} school={school} tab={tab} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
