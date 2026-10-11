const palette = [
  { name: 'Gold', hex: '#FFD447' },
  { name: 'Emerald', hex: '#007A4D' },
  { name: 'Royal blue', hex: '#214A99' },
  { name: 'Deep navy', hex: '#03213F' },
];

function VisualCard({ number, title, description, tone, children }) {
  return (
    <article className={`principle-card principle-card--${tone}`}>
      <p className="principle-card__index">{number} / {title}</p>
      <div className="principle-card__art">{children}</div>
      <div className="principle-card__content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}

export function VisualLanguageSection() {
  return (
    <section className="visual-language section-block" id="visual-language">
      <div className="content-wrap">
        <div className="visual-language__header">
          <span>03</span>
          <span>VISUAL LANGUAGE</span>
        </div>
        <p className="eyebrow eyebrow--dark">DESIGN APPROACH</p>
        <h2 className="visual-language__heading">
          Clarity in <span className="accent-italic">every form.</span>
        </h2>
        <div className="principle-grid" data-reveal>
          <VisualCard number="01" title="FORM" description="Minimal geometry" tone="ivory">
            <img
              className="principle-card__symbol"
              src="/reference-assets/monogram-form.png"
              alt=""
              loading="lazy"
            />
          </VisualCard>
          <VisualCard number="02" title="COLOUR" description="Purposeful palette" tone="ivory">
            <div className="palette-grid" aria-label="Gold, emerald, royal blue, and deep navy palette">
              {palette.map((swatch) => (
                <span key={swatch.name} style={{ backgroundColor: swatch.hex }} title={swatch.name} />
              ))}
            </div>
          </VisualCard>
          <VisualCard number="03" title="TYPE" description="Contemporary type" tone="navy">
            <div className="type-sample" aria-hidden="true">
              <span>Aa</span>
              <img src="/reference-assets/monogram-technology.png" alt="" loading="lazy" />
            </div>
          </VisualCard>
        </div>
      </div>
    </section>
  );
}
