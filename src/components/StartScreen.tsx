import { useState } from 'react';
import ProfessorIcon from './ProfessorIcon';
import SchoolAutocomplete from './SchoolAutocomplete';
import MoleCharIcon from './MoleCharIcon';

interface StartScreenProps {
  onStart: (data: { prof1: string; prof2: string; playerName: string; school: string }) => void;
}

function useInput(init = '') {
  const [value, setValue] = useState(init);
  const [focused, setFocused] = useState(false);
  return { value, focused, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value), onFocus: () => setFocused(true), onBlur: () => setFocused(false) };
}

function InputField({ label, placeholder, maxLength, required, ...props }: {
  label: string; placeholder: string; maxLength: number; required?: boolean;
  value: string; focused: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onFocus: () => void; onBlur: () => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.45)' }}>
        {label}{required && <span style={{ color: '#E74C3C' }}> *</span>}
      </label>
      <input
        type="text" placeholder={placeholder} maxLength={maxLength}
        value={props.value} onChange={props.onChange} onFocus={props.onFocus} onBlur={props.onBlur} onKeyDown={props.onKeyDown}
        className="w-full rounded-xl px-4 py-3 text-white font-semibold text-base outline-none transition-all"
        style={{
          background: 'rgba(255,255,255,0.10)',
          border: props.focused ? '1.5px solid #F4D03F' : '1.5px solid rgba(255,255,255,0.18)',
          boxShadow: props.focused ? '0 0 0 3px rgba(244,208,63,0.12)' : 'none',
        }}
      />
    </div>
  );
}

export default function StartScreen({ onStart }: StartScreenProps) {
  const prof1 = useInput();
  const prof2 = useInput();
  const playerName = useInput();
  const [schoolValue, setSchoolValue] = useState('');

  const canStart = prof1.value.trim() && playerName.value.trim() && schoolValue.trim();

  const handleStart = () => {
    if (!canStart) return;
    onStart({ prof1: prof1.value.trim(), prof2: prof2.value.trim(), playerName: playerName.value.trim(), school: schoolValue.trim() });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter') handleStart(); };

  return (
    <div className="flex flex-col min-h-screen" style={{ background: 'linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)' }}>

      {/* ── 모바일 레이아웃 ── */}
      <div className="flex flex-col items-center justify-center flex-1 px-6 py-8 gap-6 md:hidden">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <MoleCharIcon size={36} />
            <h1 className="text-3xl font-black text-white leading-tight">두더지(가 된 교수님)</h1>
          </div>
          <h2 className="text-4xl font-black" style={{ color: '#F4D03F' }}>잡기!</h2>
        </div>
        <div className="flex gap-4 items-end">
          <div style={{ opacity: 0.6, transform: 'scale(0.9)' }}><ProfessorIcon type="gray" size={80} /></div>
          <ProfessorIcon type="bald" size={100} />
          <div style={{ opacity: 0.6, transform: 'scale(0.9)' }}><ProfessorIcon type="gray" size={80} /></div>
        </div>
        <div className="w-full rounded-2xl p-5 flex flex-col gap-3"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.12)' }}>
          <InputField label="첫번째 교수님 성함" placeholder="예: 홍길동 교수님" maxLength={20} required {...prof1} onKeyDown={handleKeyDown} />
          <InputField label="두번째 교수님 성함 (선택)" placeholder="예: 김철수 교수님" maxLength={20} {...prof2} onKeyDown={handleKeyDown} />
          <div className="border-t my-1" style={{ borderColor: 'rgba(255,255,255,0.08)' }} />
          <div className="flex gap-3">
            <div className="flex-1"><InputField label="내 이름" placeholder="홍길동" maxLength={10} required {...playerName} onKeyDown={handleKeyDown} /></div>
            <div className="flex-1">
              <SchoolAutocomplete value={schoolValue} onChange={setSchoolValue} onKeyDown={handleKeyDown} required />
            </div>
          </div>
          <button onClick={handleStart} disabled={!canStart}
            className="w-full py-4 rounded-xl font-black text-xl transition-all active:scale-95 disabled:opacity-35 disabled:cursor-not-allowed mt-1"
            style={{ background: canStart ? 'linear-gradient(135deg,#F4D03F,#F39C12)' : 'rgba(255,255,255,0.08)', color: canStart ? '#1a1a2e' : '#555', boxShadow: canStart ? '0 4px 20px rgba(244,208,63,0.4)' : 'none' }}>
            게임 시작!
          </button>
        </div>
        <div className="flex gap-4 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
          <span>교수님 <span style={{ color: '#2ECC71' }}>+100점</span></span>
          <span>꽝/빈곳 <span style={{ color: '#E74C3C' }}>-50점</span></span>
          <span>놓쳐도 0점</span>
        </div>
      </div>

      {/* ── 데스크탑 레이아웃 ── */}
      <div className="hidden md:flex flex-col items-center justify-center flex-1 px-8 py-10 gap-8">
        {/* 타이틀 */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <MoleCharIcon size={52} />
            <h1 className="text-5xl font-black text-white leading-tight drop-shadow-lg">두더지(가 된 교수님)</h1>
          </div>
          <h2 className="text-6xl font-black" style={{ color: '#F4D03F' }}>잡기!</h2>
        </div>

        {/* 교수님 아이콘 + 입력 */}
        <div className="flex gap-20 items-start justify-center">
          {/* 교수님 1 */}
          <div className="flex flex-col items-center gap-3">
            <ProfessorIcon type="bald" size={160} />
            <div className="w-56 flex flex-col gap-1">
              <label className="text-xs font-bold text-center" style={{ color: 'rgba(255,255,255,0.45)' }}>
                첫번째 교수님 성함 <span style={{ color: '#E74C3C' }}>*</span>
              </label>
              <input type="text" placeholder="예: 홍길동 교수님" maxLength={20}
                value={prof1.value} onChange={prof1.onChange} onFocus={prof1.onFocus} onBlur={prof1.onBlur} onKeyDown={handleKeyDown}
                className="w-full rounded-xl px-4 py-3 text-white font-semibold text-base outline-none text-center transition-all"
                style={{ background: 'rgba(255,255,255,0.10)', border: prof1.focused ? '1.5px solid #F4D03F' : '1.5px solid rgba(255,255,255,0.2)', boxShadow: prof1.focused ? '0 0 0 3px rgba(244,208,63,0.12)' : 'none' }}
              />
            </div>
          </div>

          {/* VS */}
          <div className="flex items-center" style={{ marginTop: 70 }}>
            <span className="text-3xl font-black" style={{ color: 'rgba(255,255,255,0.15)' }}>VS</span>
          </div>

          {/* 교수님 2 */}
          <div className="flex flex-col items-center gap-3">
            <ProfessorIcon type="gray" size={160} />
            <div className="w-56 flex flex-col gap-1">
              <label className="text-xs font-bold text-center" style={{ color: 'rgba(255,255,255,0.45)' }}>
                두번째 교수님 성함 <span style={{ color: 'rgba(255,255,255,0.25)' }}>(선택)</span>
              </label>
              <input type="text" placeholder="예: 김철수 교수님" maxLength={20}
                value={prof2.value} onChange={prof2.onChange} onFocus={prof2.onFocus} onBlur={prof2.onBlur} onKeyDown={handleKeyDown}
                className="w-full rounded-xl px-4 py-3 text-white font-semibold text-base outline-none text-center transition-all"
                style={{ background: 'rgba(255,255,255,0.10)', border: prof2.focused ? '1.5px solid #9B59B6' : '1.5px solid rgba(255,255,255,0.2)', boxShadow: prof2.focused ? '0 0 0 3px rgba(155,89,182,0.12)' : 'none' }}
              />
            </div>
          </div>
        </div>

        {/* 플레이어 정보 카드 */}
        <div className="w-full max-w-lg rounded-2xl p-6 flex flex-col gap-4"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.12)' }}>
          <div className="flex gap-4">
            <div className="flex-1"><InputField label="내 이름" placeholder="홍길동" maxLength={10} required {...playerName} onKeyDown={handleKeyDown} /></div>
            <div className="flex-1">
              <SchoolAutocomplete value={schoolValue} onChange={setSchoolValue} onKeyDown={handleKeyDown} required />
            </div>
          </div>
          <button onClick={handleStart} disabled={!canStart}
            className="w-full py-4 rounded-xl font-black text-2xl transition-all active:scale-95 disabled:opacity-35 disabled:cursor-not-allowed"
            style={{ background: canStart ? 'linear-gradient(135deg,#F4D03F,#F39C12)' : 'rgba(255,255,255,0.08)', color: canStart ? '#1a1a2e' : '#555', boxShadow: canStart ? '0 4px 24px rgba(244,208,63,0.45)' : 'none' }}>
            게임 시작!
          </button>
          <div className="flex gap-6 text-xs justify-center" style={{ color: 'rgba(255,255,255,0.3)' }}>
            <span>교수님 클릭 <span style={{ color: '#2ECC71' }}>+100점</span></span>
            <span>꽝 / 빈 곳 클릭 <span style={{ color: '#E74C3C' }}>-50점</span></span>
            <span>놓쳐도 0점</span>
          </div>
        </div>
      </div>
    </div>
  );
}
