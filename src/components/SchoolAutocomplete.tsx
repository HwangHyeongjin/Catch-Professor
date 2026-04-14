import { useState, useRef, useEffect } from 'react';
import { UNIVERSITIES } from '../data/universities';

interface SchoolAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  required?: boolean;
}

export default function SchoolAutocomplete({ value, onChange, onKeyDown, required }: SchoolAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = value.trim()
    ? UNIVERSITIES.filter((u) => u.includes(value.trim())).slice(0, 7)
    : [];

  const showDropdown = open && filtered.length > 0;

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (name: string) => {
    onChange(name);
    setOpen(false);
    setHighlighted(-1);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (showDropdown) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlighted((h) => Math.min(h + 1, filtered.length - 1));
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlighted((h) => Math.max(h - 1, 0));
        return;
      }
      if (e.key === 'Enter' && highlighted >= 0) {
        e.preventDefault();
        handleSelect(filtered[highlighted]);
        return;
      }
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
    }
    onKeyDown?.(e);
  };

  return (
    <div ref={containerRef} className="relative flex flex-col gap-1">
      <label className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.45)' }}>
        학교{required && <span style={{ color: '#E74C3C' }}> *</span>}
      </label>

      <input
        ref={inputRef}
        type="text"
        placeholder="학교 검색..."
        maxLength={30}
        value={value}
        onChange={(e) => { onChange(e.target.value); setOpen(true); setHighlighted(-1); }}
        onFocus={() => { setFocused(true); setOpen(true); }}
        onBlur={() => setFocused(false)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        className="w-full rounded-xl px-4 py-3 text-white font-semibold text-base outline-none transition-all"
        style={{
          background: 'rgba(255,255,255,0.10)',
          border: focused ? '1.5px solid #F4D03F' : '1.5px solid rgba(255,255,255,0.18)',
          boxShadow: focused ? '0 0 0 3px rgba(244,208,63,0.12)' : 'none',
        }}
      />

      {/* 드롭다운 */}
      {showDropdown && (
        <div
          className="absolute left-0 right-0 z-50 rounded-xl overflow-hidden"
          style={{
            top: 'calc(100% + 4px)',
            background: 'rgba(18,24,48,0.98)',
            border: '1.5px solid rgba(244,208,63,0.35)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}
        >
          {filtered.map((name, i) => (
            <button
              key={name}
              type="button"
              onMouseDown={(e) => { e.preventDefault(); handleSelect(name); }}
              onMouseEnter={() => setHighlighted(i)}
              className="w-full text-left px-4 py-2.5 text-sm font-semibold transition-colors"
              style={{
                background: i === highlighted ? 'rgba(244,208,63,0.15)' : 'transparent',
                color: i === highlighted ? '#F4D03F' : 'rgba(255,255,255,0.75)',
                borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}
            >
              {/* 검색어 하이라이트 */}
              {name.split(new RegExp(`(${value.trim()})`, 'gi')).map((part, pi) =>
                part.toLowerCase() === value.trim().toLowerCase()
                  ? <span key={pi} style={{ color: '#F4D03F', fontWeight: 900 }}>{part}</span>
                  : <span key={pi}>{part}</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
