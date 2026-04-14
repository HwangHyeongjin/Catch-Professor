interface BombIconProps {
  size?: number;
  isHit?: boolean;
}

// 꽝 학생 아이콘 - 교수님과 비슷한 카툰 플랫 스타일
export default function BombIcon({ size = 80, isHit = false }: BombIconProps) {
  return (
    <div
      className={`transition-all duration-100 select-none ${isHit ? 'hit-flash scale-90' : ''}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 몸통 */}
        <rect x="22" y="60" width="56" height="40" rx="6" fill="#2C3E50" />
        {/* 후드 끈 */}
        <rect x="35" y="60" width="30" height="40" rx="4" fill="#34495E" />

        {/* 꽝 텍스트 - 몸통 중앙 */}
        <text
          x="50"
          y="86"
          textAnchor="middle"
          fontSize="22"
          fontWeight="900"
          fill="#E74C3C"
          fontFamily="Arial, sans-serif"
          letterSpacing="-1"
        >
          꽝
        </text>

        {/* 얼굴 */}
        <ellipse cx="50" cy="43" rx="20" ry="21" fill="#F5CBA7" />

        {/* 머리카락 */}
        <ellipse cx="50" cy="24" rx="20" ry="10" fill="#2C3E50" />
        <rect x="30" y="24" width="40" height="12" fill="#2C3E50" />
        {/* 앞머리 */}
        <path d="M34 28 Q40 22 50 24 Q60 22 66 28" fill="#2C3E50" />

        {/* 귀 */}
        <ellipse cx="30" cy="44" rx="4" ry="5" fill="#F5CBA7" />
        <ellipse cx="70" cy="44" rx="4" ry="5" fill="#F5CBA7" />

        {/* 눈썹 (찡그림) */}
        <path d="M36 34 Q40 31 44 33" stroke="#2C3E50" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M56 33 Q60 31 64 34" stroke="#2C3E50" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* 눈 (찡그린 x자) */}
        <line x1="38" y1="38" x2="43" y2="43" stroke="#2C3E50" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="43" y1="38" x2="38" y2="43" stroke="#2C3E50" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="57" y1="38" x2="62" y2="43" stroke="#2C3E50" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="62" y1="38" x2="57" y2="43" stroke="#2C3E50" strokeWidth="2.2" strokeLinecap="round" />

        {/* 입 (삐죽) */}
        <path d="M43 52 Q50 56 57 52" stroke="#C0392B" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* 빨간 볼 */}
        <ellipse cx="37" cy="48" rx="4" ry="2.5" fill="#E74C3C" fillOpacity="0.35" />
        <ellipse cx="63" cy="48" rx="4" ry="2.5" fill="#E74C3C" fillOpacity="0.35" />

        {/* 외곽선 */}
        <ellipse cx="50" cy="43" rx="20" ry="21" stroke="#2C3E50" strokeWidth="2.5" fill="none" />
        <rect x="22" y="60" width="56" height="40" rx="6" stroke="#2C3E50" strokeWidth="2.5" fill="none" />
      </svg>
    </div>
  );
}
