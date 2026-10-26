import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { CosmicGridCanvas } from './components/CosmicGridCanvas';
import { Navbar } from './components/Navbar';
import { SmokedGlassHero } from './components/SmokedGlassHero';
import { GlassDefinitionsView } from './components/GlassDefinitionsView';
import { Projects } from './components/Projects';
import { TechStack } from './components/TechStack';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CvModal } from './components/CvModal';

export const AppContent: React.FC = () => {
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [isShattered, setIsShattered] = useState(false);

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#050507] text-stone-200 selection:bg-amber-600/30 selection:text-amber-200">
      {/* Background Reticle and Atmospheric Texture */}
      <CosmicGridCanvas />

      {/* Floating Precision Navigation */}
      <Navbar onOpenCv={() => setIsCvModalOpen(true)} />

      {/* 1. Main WebGL Smoked Glass Hero */}
      <SmokedGlassHero
        onOpenCv={() => setIsCvModalOpen(true)}
        onExploreProjects={scrollToProjects}
        onShatterChange={(shattered) => setIsShattered(shattered)}
      />

      {/* 2. Shattered Dossier View: "Real-time engineering, in five terms" */}
      {isShattered && (
        <GlassDefinitionsView onBack={() => setIsShattered(false)} />
      )}

      {/* 3. Deep Dive Engineering Catalog & Sections */}
      <main className="relative z-10">
        <Projects />
        <TechStack />
        <ExperienceTimeline />
        <Education />
        <Contact onOpenCv={() => setIsCvModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Official CV Modal with dual PDF downloads */}
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
