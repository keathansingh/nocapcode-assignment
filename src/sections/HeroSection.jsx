const attributes = ['EXCELLENCE', 'TECHNOLOGY', 'SUSTAINABILITY', 'PROGRESS'];

export function HeroSection() {
  return (
    <header className="hero-section" id="top">
      <div className="hero-section__inner">
        <p className="eyebrow eyebrow--center">BRAND IDENTITY CASE STUDY</p>
        <h1 className="hero-title">
          <span className="hero-title__serif">Crafting a</span>
          <span className="hero-title__bold">Symbol of</span>
          <span className="hero-title__bold hero-title__last-line">Identity<span>.</span></span>
        </h1>
        <p className="hero-subtitle">Pasha Patel SkillTech University</p>
        <ul className="hero-attributes" aria-label="Brand attributes">
          {attributes.map((attribute, index) => (
            <li className={index === 0 || index === 2 ? 'hero-attributes__accent' : ''} key={attribute}>
              {attribute}
            </li>
          ))}
        </ul>
        <a className="scroll-link" href="#overview">
          Explore the identity <span aria-hidden="true">↓</span>
        </a>
      </div>
    </header>
  );
}
