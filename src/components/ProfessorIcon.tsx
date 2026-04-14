interface ProfessorIconProps {
  type?: 'bald' | 'gray';
  size?: number;
  isHit?: boolean;
}

// 대머리 교수님 (왼쪽 타입)
function BaldProfessor({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 몸통 (조끼) */}
      <rect x="20" y="62" width="60" height="38" rx="6" fill="#6B9FD4" />
      {/* 셔츠 */}
      <rect x="30" y="62" width="40" height="38" rx="4" fill="#FFFFFF" />
      {/* 넥타이 */}
      <polygon points="50,65 46,72 50,82 54,72" fill="#C0392B" />
      <rect x="47" y="63" width="6" height="5" rx="1" fill="#C0392B" />

      {/* 얼굴 */}
      <ellipse cx="50" cy="44" rx="22" ry="23" fill="#F5CBA7" />
      {/* 머리 (대머리 - 약간만) */}
      <ellipse cx="50" cy="26" rx="18" ry="14" fill="#F5CBA7" />
      {/* 대머리 줄 */}
      <path d="M35 26 Q42 22 50 21 Q58 22 65 26" stroke="#D4A87A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M37 30 Q44 26 50 25 Q56 26 63 30" stroke="#D4A87A" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* 귀 */}
      <ellipse cx="28" cy="46" rx="4" ry="5" fill="#F5CBA7" />
      <ellipse cx="72" cy="46" rx="4" ry="5" fill="#F5CBA7" />

      {/* 눈썹 */}
      <path d="M37 36 Q41 33 45 35" stroke="#5D4037" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M55 35 Q59 33 63 36" stroke="#5D4037" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* 눈 */}
      <ellipse cx="41" cy="40" rx="3.5" ry="3.5" fill="white" />
      <ellipse cx="59" cy="40" rx="3.5" ry="3.5" fill="white" />
      <circle cx="41" cy="41" r="2" fill="#2C3E50" />
      <circle cx="59" cy="41" r="2" fill="#2C3E50" />
      <circle cx="42" cy="40" r="0.8" fill="white" />
      <circle cx="60" cy="40" r="0.8" fill="white" />

      {/* 콧수염 */}
      <ellipse cx="50" cy="51" rx="8" ry="3" fill="#7F8C8D" />
      <path d="M42 51 Q46 54 50 52 Q54 54 58 51" stroke="#7F8C8D" strokeWidth="0.5" fill="#7F8C8D" fillOpacity="0.3" />

      {/* 외곽선 */}
      <ellipse cx="50" cy="44" rx="22" ry="23" stroke="#2C3E50" strokeWidth="2.5" fill="none" />
      <rect x="20" y="62" width="60" height="38" rx="6" stroke="#2C3E50" strokeWidth="2.5" fill="none" />
    </svg>
  );
}

// 안경 회색머리 교수님 (오른쪽 타입)
function GrayProfessor({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 몸통 (정장) */}
      <rect x="18" y="62" width="64" height="38" rx="6" fill="#7F8C8D" />
      {/* 셔츠 */}
      <rect x="32" y="62" width="36" height="38" rx="4" fill="#FDFEFE" />
      {/* 정장 라펠 */}
      <polygon points="32,62 45,70 45,100 18,100 18,68" fill="#7F8C8D" />
      <polygon points="68,62 55,70 55,100 82,100 82,68" fill="#7F8C8D" />
      {/* 넥타이 */}
      <polygon points="50,65 46,73 50,84 54,73" fill="#E74C3C" />
      <rect x="47" y="63" width="6" height="5" rx="1" fill="#E74C3C" />

      {/* 얼굴 */}
      <ellipse cx="50" cy="44" rx="21" ry="22" fill="#F0D9B5" />

      {/* 회색 머리카락 */}
      <path d="M29 38 Q28 25 38 20 Q50 16 62 20 Q72 25 71 38" fill="#BDC3C7" />
      <path d="M29 38 Q30 28 35 24" stroke="#95A5A6" strokeWidth="1.5" fill="none" />
      <path d="M71 38 Q70 28 65 24" stroke="#95A5A6" strokeWidth="1.5" fill="none" />

      {/* 귀 */}
      <ellipse cx="29" cy="46" rx="4" ry="5" fill="#F0D9B5" />
      <ellipse cx="71" cy="46" rx="4" ry="5" fill="#F0D9B5" />

      {/* 안경 */}
      <rect x="33" y="37" width="13" height="10" rx="4" fill="none" stroke="#2C3E50" strokeWidth="2.2" />
      <rect x="54" y="37" width="13" height="10" rx="4" fill="none" stroke="#2C3E50" strokeWidth="2.2" />
      <line x1="46" y1="41" x2="54" y2="41" stroke="#2C3E50" strokeWidth="2" />
      <line x1="29" y1="40" x2="33" y2="40" stroke="#2C3E50" strokeWidth="2" />
      <line x1="67" y1="40" x2="71" y2="40" stroke="#2C3E50" strokeWidth="2" />

      {/* 눈 */}
      <circle cx="39.5" cy="42" r="2.2" fill="#2C3E50" />
      <circle cx="60.5" cy="42" r="2.2" fill="#2C3E50" />
      <circle cx="40.3" cy="41.2" r="0.8" fill="white" />
      <circle cx="61.3" cy="41.2" r="0.8" fill="white" />

      {/* 눈썹 */}
      <path d="M34 35 Q39 32 44 34" stroke="#5D4037" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M56 34 Q61 32 66 35" stroke="#5D4037" strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* 콧수염 */}
      <path d="M42 52 Q46 55 50 53 Q54 55 58 52" fill="#95A5A6" stroke="#95A5A6" strokeWidth="0.5" />
      <ellipse cx="50" cy="51" rx="7" ry="2.5" fill="#95A5A6" />

      {/* 외곽선 */}
      <ellipse cx="50" cy="44" rx="21" ry="22" stroke="#2C3E50" strokeWidth="2.5" fill="none" />
      <rect x="18" y="62" width="64" height="38" rx="6" stroke="#2C3E50" strokeWidth="2.5" fill="none" />
    </svg>
  );
}

export default function ProfessorIcon({ type = 'bald', size = 80, isHit = false }: ProfessorIconProps) {
  return (
    <div
      className={`transition-all duration-100 select-none ${isHit ? 'hit-flash scale-90' : ''}`}
      style={{ width: size, height: size }}
    >
      {type === 'bald' ? (
        <BaldProfessor size={size} />
      ) : (
        <GrayProfessor size={size} />
      )}
    </div>
  );
}
