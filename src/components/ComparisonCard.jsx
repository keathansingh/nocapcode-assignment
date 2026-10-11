export function ComparisonCard({ label, subtitle, variant, children, caption, title, detail }) {
  return (
    <article className={`comparison-card comparison-card--${variant}`}>
      <div className="comparison-card__meta">
        <span className="comparison-card__label">{label}</span>
        <span className="comparison-card__subtitle">{subtitle}</span>
      </div>
      <div className="comparison-card__art">{children}</div>
      {title && <h3 className="comparison-card__title">{title}</h3>}
      {detail && <p className="comparison-card__detail">{detail}</p>}
      {caption && <p className="comparison-card__caption">{caption}</p>}
    </article>
  );
}
