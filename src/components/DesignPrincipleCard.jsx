export function DesignPrincipleCard({ heading, support, tone, children }) {
  return (
    <article className={`principle-card principle-card--${tone}`}>
      <div className="principle-card__art">{children}</div>
      <div className="principle-card__content">
        <h3>{heading}</h3>
        <p>{support}</p>
      </div>
    </article>
  );
}
