import { ComparisonCard } from '../components/ComparisonCard';
export function TransformationSection() {
  return (
    <section className="transformation-section section-block" id="transformation">
      <div className="content-wrap transformation-layout">
        <div className="transformation-copy" data-reveal>
          <p className="eyebrow eyebrow--light">THE TRANSFORMATION</p>
          <h2>
            From ornate<br />
            to <span className="accent-italic">iconic.</span>
          </h2>
          <p>
            The redesign strips away complexity while preserving the university's spirit,
            creating a distinct system designed to live confidently on screens and in print.
          </p>
        </div>

        <div className="comparison-grid" data-reveal>
          <ComparisonCard
            label="BEFORE"
            subtitle="TRADITIONAL CREST"
            variant="before"
            caption="Heritage-rich, intricate, and difficult to scale."
          >
            <img
              className="comparison-logo comparison-logo--crest"
              src="/reference-assets/crest.png"
              alt="The original Pasha Patel SkillTech University crest"
            />
          </ComparisonCard>

          <ComparisonCard
            label="AFTER"
            subtitle="CONTEMPORARY MONOGRAM"
            variant="after"
            title="Pasha Patel"
            detail="SkillTech University"
            caption="Unified, meaningful, and built for every context."
          >
            <img
              className="comparison-logo comparison-logo--monogram"
              src="/reference-assets/monogram-after.png"
              alt="The new gold geometric university monogram"
            />
          </ComparisonCard>
        </div>
      </div>
    </section>
  );
}
