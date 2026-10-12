import { useState } from 'react';

const attributes = ['EXCELLENCE', 'TECHNOLOGY', 'SUSTAINABILITY', 'PROGRESS'];

/*
OFFICIAL FACTS TO VERIFY BEFORE ADDING: placement academic year, students placed, placement
rate, highest and average package, and official report URL; official event, internship,
partnership, sustainability, and achievement details with source URLs and years.
*/
const attributeExplanations = {
  EXCELLENCE: 'At PPSTU, excellence is about education that enlightens and equips learners to make a meaningful contribution. It gives students and families a shared goal: helping each learner discover their strengths, build knowledge, and keep growing.',
  TECHNOLOGY: 'Technology is part of PPSTU’s SkillTech identity, connecting education with the changing world students will enter. For learners, it represents the chance to explore ideas and develop relevant skills; for families, it signals a focus on preparing students for a technology-shaped future.',
  SUSTAINABILITY: 'Sustainability connects PPSTU’s progress with care for nature and the resources future generations will depend on. It invites students to consider the wider impact of what they learn and do, and reassures families that responsible growth is part of the university’s identity.',
  PROGRESS: 'Progress means helping PPSTU learners move forward with purpose as they develop their knowledge and skills. It matters to students planning their next steps and to families who want an education that supports continued growth and meaningful contribution.',
};

export function HeroSection() {
  const [selectedAttribute, setSelectedAttribute] = useState(null);

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
          {attributes.map((attribute, index) => {
            const isAccent = index === 0 || index === 2;

            return (
              <li className={isAccent ? 'hero-attributes__accent' : ''} key={attribute}>
                <button
                  type="button"
                  aria-pressed={selectedAttribute === attribute}
                  onClick={() => setSelectedAttribute(attribute)}
                >
                  {attribute}
                </button>
              </li>
            );
          })}
        </ul>
        {selectedAttribute && (
          <p className="hero-attribute-explanation" key={selectedAttribute} aria-live="polite">
            {attributeExplanations[selectedAttribute]}
          </p>
        )}
        <a className="scroll-link" href="#overview">
          Explore the identity <span aria-hidden="true">↓</span>
        </a>
      </div>
    </header>
  );
}
