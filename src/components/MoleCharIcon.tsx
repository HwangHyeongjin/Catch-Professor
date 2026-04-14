interface MoleCharIconProps {
  size?: number;
}

// 동물의 숲 스타일 두더지 아이콘
export default function MoleCharIcon({ size = 48 }: MoleCharIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 흙 무더기 */}
      <ellipse cx="40" cy="72" rx="26" ry="7" fill="#8B5E3C" opacity="0.55" />
      <ellipse cx="40" cy="70" rx="22" ry="5" fill="#A0714F" opacity="0.5" />

      {/* 몸통 */}
      <ellipse cx="40" cy="56" rx="18" ry="16" fill="#6B4226" />
      <ellipse cx="40" cy="56" rx="18" ry="16" fill="url(#bodyGrad)" />

      {/* 앞발 (왼쪽) */}
      <ellipse cx="24" cy="62" rx="7" ry="5" fill="#7A4E30" transform="rotate(-20 24 62)" />
      <ellipse cx="24" cy="62" rx="5.5" ry="3.5" fill="#8B5E3C" transform="rotate(-20 24 62)" />

      {/* 앞발 (오른쪽) */}
      <ellipse cx="56" cy="62" rx="7" ry="5" fill="#7A4E30" transform="rotate(20 56 62)" />
      <ellipse cx="56" cy="62" rx="5.5" ry="3.5" fill="#8B5E3C" transform="rotate(20 56 62)" />

      {/* 얼굴 원형 */}
      <circle cx="40" cy="36" r="24" fill="#8B5E3C" />
      <circle cx="40" cy="36" r="24" fill="url(#faceGrad)" />

      {/* 얼굴 안쪽 밝은 부분 */}
      <ellipse cx="40" cy="38" rx="17" ry="15" fill="#C8906A" opacity="0.4" />

      {/* 귀 왼쪽 */}
      <ellipse cx="20" cy="17" rx="7" ry="8" fill="#7A4E30" />
      <ellipse cx="20" cy="17" rx="4.5" ry="5.5" fill="#D4967A" />

      {/* 귀 오른쪽 */}
      <ellipse cx="60" cy="17" rx="7" ry="8" fill="#7A4E30" />
      <ellipse cx="60" cy="17" rx="4.5" ry="5.5" fill="#D4967A" />

      {/* 눈 흰자 왼쪽 */}
      <circle cx="31" cy="33" r="7.5" fill="white" />
      {/* 눈 흰자 오른쪽 */}
      <circle cx="49" cy="33" r="7.5" fill="white" />

      {/* 눈동자 왼쪽 */}
      <circle cx="32" cy="34" r="4.5" fill="#1a1a2e" />
      <circle cx="31" cy="34" r="4" fill="#222" />
      {/* 눈동자 오른쪽 */}
      <circle cx="50" cy="34" r="4.5" fill="#1a1a2e" />
      <circle cx="49" cy="34" r="4" fill="#222" />

      {/* 눈 하이라이트 왼쪽 */}
      <circle cx="33.5" cy="31.5" r="1.8" fill="white" />
      <circle cx="30" cy="35" r="0.9" fill="white" opacity="0.7" />
      {/* 눈 하이라이트 오른쪽 */}
      <circle cx="51.5" cy="31.5" r="1.8" fill="white" />
      <circle cx="48" cy="35" r="0.9" fill="white" opacity="0.7" />

      {/* 코 */}
      <ellipse cx="40" cy="41" rx="5" ry="3.5" fill="#3D1F0F" />
      <ellipse cx="40" cy="41" rx="4" ry="2.5" fill="#5C2E14" />
      {/* 코 하이라이트 */}
      <ellipse cx="38.5" cy="40" rx="1.5" ry="1" fill="white" opacity="0.3" />

      {/* 볼 홍조 왼쪽 */}
      <ellipse cx="24" cy="42" rx="6" ry="3.5" fill="#E8927C" opacity="0.45" />
      {/* 볼 홍조 오른쪽 */}
      <ellipse cx="56" cy="42" rx="6" ry="3.5" fill="#E8927C" opacity="0.45" />

      {/* 입 (웃음) */}
      <path d="M35 46 Q40 51 45 46" stroke="#3D1F0F" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* 흙 얼룩 디테일 */}
      <circle cx="28" cy="28" r="2" fill="#6B4226" opacity="0.3" />
      <circle cx="53" cy="26" r="1.5" fill="#6B4226" opacity="0.25" />

      <defs>
        <radialGradient id="bodyGrad" cx="40%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#A06040" />
          <stop offset="100%" stopColor="#5A3520" />
        </radialGradient>
        <radialGradient id="faceGrad" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#B07050" />
          <stop offset="100%" stopColor="#6B4226" />
        </radialGradient>
      </defs>
    </svg>
  );
}
