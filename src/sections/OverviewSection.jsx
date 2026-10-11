import { SectionHeader } from '../components/SectionHeader';

export function OverviewSection() {
  return (
    <section className="overview-section section-block" id="overview">
      <div className="content-wrap">
        <SectionHeader number="01" label="OVERVIEW" />
        <div className="overview-layout" data-reveal>
          <div className="overview-copy">
            <h2>
              From a traditional institution to a forward-thinking hub for
              <span className="accent-italic"> skill-based education.</span>
            </h2>
          </div>
          <div className="overview-brief">
            <p className="brief-label">THE BRIEF</p>
            <p>
              Pasha Patel SkillTech University sought a refreshed identity that could reflect
              its evolution. The goal was a mark that embodies five core pillars while
              remaining clear, memorable, and relevant across every medium.
            </p>
            <p>
              The old emblem carried heritage and detail, but its complexity limited digital
              adaptability. At smaller scales, its meaning and recognition were lost.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
