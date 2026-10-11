import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const targets = [...document.querySelectorAll('[data-reveal]')];
    if (!targets.length || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        activeObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

    targets.forEach((target) => observer.observe(target));
    document.documentElement.classList.add('reveal-ready');

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('reveal-ready');
    };
  }, []);
}
