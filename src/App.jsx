import { useCallback, useState } from 'react';
import './styles/variables.css';
import './styles/global.css';
import './App.css';

import { HeroSection } from './sections/HeroSection';
import { OverviewSection } from './sections/OverviewSection';
import { TransformationSection } from './sections/TransformationSection';
import { IdentitySection } from './sections/IdentitySection';
import { VisualLanguageSection } from './sections/VisualLanguageSection';
import { ApplicationsSection } from './sections/ApplicationsSection';
import { OutcomeSection } from './sections/OutcomeSection';
import { ChatWidget } from './components/ChatWidget';
import { ContactModal } from './components/ContactModal';
import { ImageLightbox } from './components/ImageLightbox';
import { ReadingProgress } from './components/ReadingProgress';
import { useScrollReveal } from './hooks/useScrollReveal';

function App() {
  const [lightbox, setLightbox] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  useScrollReveal();

  const openLightbox = useCallback((images, activeIndex) => {
    setLightbox({ images, activeIndex });
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const navigateLightbox = useCallback((activeIndex) => {
    setLightbox((current) => current ? { ...current, activeIndex } : null);
  }, []);

  const openContact = useCallback(() => setIsContactOpen(true), []);
  const closeContact = useCallback(() => setIsContactOpen(false), []);

  return (
    <main className="page-shell">
      <ReadingProgress />
      <HeroSection />
      <OverviewSection />
      <TransformationSection />
      <IdentitySection />
      <VisualLanguageSection />
      <ApplicationsSection onImageOpen={openLightbox} />
      <OutcomeSection onContact={openContact} />
      <ChatWidget onContact={openContact} />
      {lightbox && (
        <ImageLightbox
          images={lightbox.images}
          activeIndex={lightbox.activeIndex}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
        />
      )}
      {isContactOpen && <ContactModal onClose={closeContact} />}
    </main>
  );
}

export default App;
