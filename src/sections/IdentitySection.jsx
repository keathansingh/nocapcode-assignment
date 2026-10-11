const values = [
  {
    number: '01',
    mark: 'PP',
    name: 'Pragati & Prakriti',
    translation: 'PROGRESS & NATURE',
    description: 'Progress that empowers every learner to move ahead with purpose, rooted in sustainability.',
    image: '/reference-assets/monogram-progress.png',
    alt: 'Progress and nature monogram',
  },
  {
    number: '02',
    mark: 'S',
    name: 'Shiksha',
    translation: 'EDUCATION',
    description: 'Education that enlightens, equips, and prepares learners for meaningful real-world impact.',
    image: '/reference-assets/monogram-education.png',
    alt: 'Education monogram',
  },
  {
    number: '03',
    mark: 'T',
    name: 'Taknik',
    translation: 'TECHNOLOGY',
    description: 'Technology that drives transformation, exploration, and creativity without limits.',
    image: '/reference-assets/monogram-technology.png',
    alt: 'Technology monogram',
  },
  {
    number: '04',
    mark: 'U',
    name: 'Utkarsh',
    translation: 'EXCELLENCE',
    description: 'Excellence that inspires change and creates lasting impact beyond boundaries.',
    image: '/reference-assets/monogram-excellence.png',
    alt: 'Excellence monogram',
  },
];

export function IdentitySection() {
  return (
    <section className="identity-section section-block" id="identity">
      <div className="content-wrap">
        <div className="identity-section__header">
          <span className="identity-section__number">02</span>
          <span>THE IDENTITY</span>
        </div>
        <div className="identity-intro" data-reveal>
          <h2 className="identity-heading">
            One monogram.<br />
            <span className="accent-italic">Five powerful ideas.</span>
          </h2>
          <p>
            Each letter is reimagined as a geometric symbol. Together, they form a balanced
            emblem that turns the university’s values into a visual language.
          </p>
        </div>
        <div className="value-grid" data-reveal>
          {values.map((value) => (
            <article className="value-card" key={value.number}>
              <div className="value-card__meta">
                <span>{value.number}</span>
                <span>{value.mark}</span>
              </div>
              <div className="value-card__art">
                <img src={value.image} alt={value.alt} loading="lazy" />
              </div>
              <div className="value-card__body">
                <h3>{value.name}</h3>
                <p className="value-card__translation">{value.translation}</p>
                <p className="value-card__description">{value.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
