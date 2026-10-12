// Replace these with verified official PPSTU profile URLs when the accounts exist.
const SOCIAL_PROFILE_URLS = {
  linkedin: '',
  instagram: '',
};

function SocialIconLink({ name, url, children }) {
  const isConfigured = Boolean(url);

  return (
    <a
      className="outcome-social-icon"
      role="link"
      href={isConfigured ? url : undefined}
      target={isConfigured ? '_blank' : undefined}
      rel={isConfigured ? 'noopener noreferrer' : undefined}
      aria-label={name}
      aria-disabled={!isConfigured}
      title={isConfigured ? name : `Official ${name} profile URL not configured`}
      tabIndex={0}
      onClick={(event) => {
        if (!isConfigured) event.preventDefault();
      }}
    >
      {children}
    </a>
  );
}

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
          <div className="outcome-actions">
            <button className="outcome-contact" type="button" onClick={onContact}>Contact the team</button>
            <div className="outcome-social-links">
              <SocialIconLink name="LinkedIn" url={SOCIAL_PROFILE_URLS.linkedin}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM8.34 18H5.67V9.4h2.67ZM7 8.23a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1ZM18.34 18h-2.67v-4.18c0-1-.02-2.28-1.39-2.28s-1.6 1.08-1.6 2.2V18H10V9.4h2.57v1.17h.04a2.82 2.82 0 0 1 2.54-1.4c2.72 0 3.22 1.8 3.22 4.14Z" />
                </svg>
              </SocialIconLink>
              <SocialIconLink name="Instagram" url={SOCIAL_PROFILE_URLS.instagram}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="17.5" cy="6.5" r="1.25" />
                </svg>
              </SocialIconLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
