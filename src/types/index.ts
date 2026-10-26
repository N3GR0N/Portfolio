export type Language = 'es' | 'en';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'astronomy' | 'distributed' | 'backend';
  categoryLabel: string;
  stack: string[];
  badges: string[];
  highlights: string[];
  githubUrl: string;
  demoUrl?: string;
  featured: boolean;
  metrics?: { label: string; value: string }[];
  interactiveType?: 'sky-map' | 'process-orchestrator' | 'api-bench';
}

export interface ExperienceItem {
  id: string;
  role: string;
  institution: string;
  location: string;
  period: string;
  current: boolean;
  description: string[];
  metrics?: { label: string; value: string }[];
  tags: string[];
  type: 'academic' | 'freelance' | 'it-support';
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  skills: {
    name: string;
    level?: string;
    featured?: boolean;
    category?: string;
  }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  faculty: string;
  period: string;
  status: string;
  location: string;
  highlights: string[];
}
