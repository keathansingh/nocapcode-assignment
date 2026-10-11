export function IdentityValueCard({ number, name, translation, description, children, tone = 'default' }) {
  return (
    <article className={`value-card value-card--${tone}`}>
      <div className="value-card__header">
        <span className="value-card__number">{number}</span>
        <div className="value-card__mark">{children}</div>
      </div>
      <div className="value-card__body">
        <h3>{name}</h3>
        <p className="value-card__translation">{translation}</p>
        <p className="value-card__description">{description}</p>
      </div>
    </article>
  );
}
