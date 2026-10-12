export function OutcomeSection({ onContact }) {
  return (
    <section className="outcome-section section-block" id="outcome">
      <div className="content-wrap outcome-layout">
        <div className="outcome-mark" data-reveal>
          <img
            src="/reference-assets/monogram-outcome.png"
            alt="The Pasha Patel SkillTech University monogram"
            loading="lazy"
          />
        </div>
        <div className="outcome-copy" data-reveal>
          <p className="eyebrow eyebrow--light">THE OUTCOME</p>
          <h2>
            Rooted in purpose.<br />
            <span className="accent-italic">Ready for tomorrow.</span>
          </h2>
          <p>
            The new identity aligns with PPSTU’s mission: empowering learners through
            sustainable progress and technological excellence. Cohesive, scalable, and
            unmistakably its own.
          </p>
          <button className="outcome-contact" type="button" onClick={onContact}>Contact the team</button>
        </div>
      </div>
    </section>
  );
}
