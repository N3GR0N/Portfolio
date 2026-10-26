import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { StarfieldCanvas } from './components/StarfieldCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { TechStack } from './components/TechStack';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CvModal } from './components/CvModal';
import { ProjectInteractiveModal } from './components/ProjectInteractiveModal';

export const AppContent: React.FC = () => {
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [activeSandboxProject, setActiveSandboxProject] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen bg-[#090a0f] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Dynamic Starfield & Celestial particle background */}
      <StarfieldCanvas />

      {/* Main navigation */}
      <Navbar onOpenCv={() => setIsCvModalOpen(true)} />

      {/* Page Sections */}
      <main className="relative z-10">
        <Hero onOpenCv={() => setIsCvModalOpen(true)} />
        <Projects onOpenSandbox={(id) => setActiveSandboxProject(id)} />
        <TechStack />
        <ExperienceTimeline />
        <Education />
        <Contact onOpenCv={() => setIsCvModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <CvModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
      />

      <ProjectInteractiveModal
        projectId={activeSandboxProject}
        onClose={() => setActiveSandboxProject(null)}
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
