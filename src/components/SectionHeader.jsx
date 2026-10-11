export function SectionHeader({ number, label, align = 'left', className = '' }) {
  return (
    <div className={`section-header section-header--${align} ${className}`.trim()}>
      <span className="section-header__number">{number}</span>
      <span className="section-header__label">{label}</span>
    </div>
  );
}
