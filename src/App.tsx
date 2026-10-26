import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CvModal } from './components/CvModal';

export const AppContent: React.FC = () => {
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-obsidian text-paper selection:bg-white selection:text-black">
      {/* 66px Fixed Monopo Saigon Navigation */}
      <Navbar onOpenCv={() => setIsCvModalOpen(true)} />

      {/* Main Editorial Flow */}
      <main>
        {/* Fullscreen Dark Hero with Chromatic Iridescent Liquid Exception */}
        <Hero onOpenCv={() => setIsCvModalOpen(true)} />

        {/* 01: Key Projects Editorial Archive */}
        <Projects />

        {/* 02: Experience & Teaching Trajectory Ledger */}
        <ExperienceTimeline />

        {/* 03: Academic Background & Competencies */}
        <Education />

        {/* 04: Direct Inquiry & Transmission Pipeline */}
        <Contact onOpenCv={() => setIsCvModalOpen(true)} />
      </main>

      {/* Inkstone Monopo Saigon Footer */}
      <Footer />

      {/* ATS & Sourcer Dual-Language CV Modal (0px Sharp Shell) */}
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
