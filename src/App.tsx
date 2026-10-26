import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { CosmicGridCanvas } from './components/CosmicGridCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { TechStack } from './components/TechStack';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CvModal } from './components/CvModal';

export const AppContent: React.FC = () => {
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#0b0b0c] text-stone-200 selection:bg-amber-600/30 selection:text-amber-200">
      {/* Subtle Technical Reticle & Vector Canvas */}
      <CosmicGridCanvas />

      {/* Persistent Precision Header */}
      <Navbar onOpenCv={() => setIsCvModalOpen(true)} />

      {/* Main Sections */}
      <main className="relative z-10">
        <Hero onOpenCv={() => setIsCvModalOpen(true)} />
        <Projects />
        <TechStack />
        <ExperienceTimeline />
        <Education />
        <Contact onOpenCv={() => setIsCvModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* CV Modal with instant ES / EN PDF previews and download */}
      <CvModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
