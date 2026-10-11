import { useEffect, useRef } from 'react';

export function ImageLightbox({ images, activeIndex, onClose, onNavigate }) {
  const closeButtonRef = useRef(null);
  const lastFocusedElement = useRef(null);
  const currentImage = images[activeIndex];

  useEffect(() => {
    if (!currentImage) return undefined;

    lastFocusedElement.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onNavigate((activeIndex + 1) % images.length);
      if (event.key === 'ArrowLeft') onNavigate((activeIndex + images.length - 1) % images.length);
      if (event.key === 'Tab') {
        const controls = [...document.querySelectorAll('.lightbox-dialog button')];
        if (!controls.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      lastFocusedElement.current?.focus?.();
    };
  }, [activeIndex, currentImage, images.length, onClose, onNavigate]);

  if (!currentImage) return null;

  return (
    <div
      className="lightbox-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="lightbox-dialog" role="dialog" aria-modal="true" aria-label="Identity application image">
        <button className="lightbox-close" onClick={onClose} ref={closeButtonRef} aria-label="Close image">
          ×
        </button>
        <button
          className="lightbox-navigation lightbox-navigation--previous"
          onClick={() => onNavigate((activeIndex + images.length - 1) % images.length)}
          aria-label="Previous image"
        >
          ‹
        </button>
        <figure className="lightbox-figure">
          <img src={currentImage.src} alt={currentImage.alt} />
          <figcaption>{currentImage.alt}</figcaption>
        </figure>
        <button
          className="lightbox-navigation lightbox-navigation--next"
          onClick={() => onNavigate((activeIndex + 1) % images.length)}
          aria-label="Next image"
        >
          ›
        </button>
      </section>
    </div>
  );
}
