const applications = [
  { name: 'Identity badge', src: 'collage-badge.png', className: 'badge' },
  { name: 'Branded notebook', src: 'collage-notebook.png', className: 'notebook' },
  { name: 'Business card', src: 'collage-business-card.png', className: 'business-card' },
  { name: 'Phone displaying the identity', src: 'collage-phone.png', className: 'phone' },
  { name: 'Printed stationery', src: 'collage-stationery.png', className: 'stationery' },
  { name: 'University building signage', src: 'collage-building.png', className: 'building' },
  { name: 'Outdoor university sign', src: 'collage-outdoor-sign.png', className: 'outdoor-sign' },
  { name: 'Interior reception branding', src: 'collage-interior.png', className: 'interior' },
];

export function ApplicationsSection({ onImageOpen }) {
  return (
    <section className="applications-section section-block" id="applications">
      <div className="content-wrap">
        <div className="applications-section__header">
          <span>04</span>
          <span>IDENTITY IN USE</span>
        </div>
        <div className="applications-header" data-reveal>
          <h2>Built to live<br /><span className="accent-italic">everywhere.</span></h2>
          <p>
            From a learner’s first notebook to the university’s physical environment, the
            identity remains clear, consistent, and unmistakable at every scale.
          </p>
        </div>
        <div className="applications-showcase" aria-label="University identity applications" data-reveal>
          {applications.map((item) => (
            <button
              className={`application-card application-card--${item.className}`}
              key={item.src}
              type="button"
              aria-label={`View larger image: ${item.name}`}
              onClick={() => onImageOpen(applications.map((image) => ({
                src: `/reference-assets/${image.src}`,
                alt: image.name,
              })), applications.findIndex((image) => image.src === item.src))}
            >
              <img
                src={`/reference-assets/${item.src}`}
                alt=""
                loading="lazy"
              />
            </button>
          ))}
        </div>
        <div className="application-meta">
          <span>SCALABLE BY DESIGN</span>
          <span>DIGITAL / PRINT / ENVIRONMENTAL</span>
        </div>
      </div>
    </section>
  );
}
