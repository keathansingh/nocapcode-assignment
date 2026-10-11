export function MonogramMark({ className = '', variant = 'gold', inverted = false, compact = false }) {
  const fillMap = {
    gold: '#FFD447',
    forest: '#062F20',
    emerald: '#007A4D',
    ivory: '#F5F5EB',
    navy: '#03213F',
  };

  const primary = fillMap[variant] ?? fillMap.gold;
  const outer = inverted ? '#F5F5EB' : primary;
  const inner = inverted ? '#F5F5EB' : '#062F20';
  const ring = inverted ? 'rgba(245,245,235,0.12)' : 'rgba(6,47,32,0.08)';
  const strokeWidth = compact ? 4 : 5;

  return (
    <svg viewBox="0 0 180 180" className={className} aria-hidden="true" role="img">
      <path
        d="M90 18L138 30V88C138 120 116 142 90 158C64 142 42 120 42 88V30L90 18Z"
        fill={ring}
        stroke={outer}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M90 38L122 48V85C122 109 105 128 90 136C75 128 58 109 58 85V48L90 38Z"
        fill="none"
        stroke={outer}
        strokeWidth={strokeWidth - 1}
        strokeLinejoin="round"
      />

      <path
        d="M76 54V122M76 54H93C108 54 118 64 118 78C118 92 108 102 93 102H76"
        fill="none"
        stroke={outer}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M76 102H119" fill="none" stroke={outer} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M94 54V122" fill="none" stroke={outer} strokeWidth={strokeWidth} strokeLinecap="round" opacity="0.9" />

      <path d="M74 122H117" fill="none" stroke={inner} strokeWidth={3.4} strokeLinecap="round" opacity={inverted ? 0.72 : 0.4} />
    </svg>
  );
}
