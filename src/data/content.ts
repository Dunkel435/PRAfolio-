// ─────────────────────────────────────────────
// CONTENT ARCHITECTURE
// All public-facing content lives here, separated from presentation.
// A future private /admin system can edit these values without
// touching the visual components.
//
// Fields marked with [EDITABLE] are placeholders waiting for
// real content from Pratham. Do not fabricate values.
// ─────────────────────────────────────────────

export type SectionId =
  | 'introduction'
  | 'work'
  | 'experiments'
  | 'projects'
  | 'about'
  | 'resume'
  | 'contact'
  | 'reven-eye';

export interface NavItem {
  id: SectionId;
  number: string;
  german: string;
  title: string;
  index: number;
}

export const navItems: NavItem[] = [
  { id: 'introduction', number: '01', german: 'EINS', title: 'Introduction', index: 0 },
  { id: 'work', number: '02', german: 'ZWEI', title: 'Selected Work', index: 1 },
  { id: 'experiments', number: '03', german: 'DREI', title: 'Experiments', index: 2 },
  { id: 'projects', number: '04', german: 'VIER', title: 'Projects', index: 3 },
  { id: 'about', number: '05', german: 'FÜNF', title: 'About', index: 4 },
  { id: 'resume', number: '06', german: 'SECHS', title: 'Resume', index: 5 },
  { id: 'contact', number: '07', german: 'SIEBEN', title: 'Contact', index: 6 },
  { id: 'reven-eye', number: '08', german: 'ACHT', title: 'Reven Eye', index: 7 },
];

export const navMap: Record<SectionId, NavItem> = navItems.reduce(
  (acc, item) => ({ ...acc, [item.id]: item }),
  {} as Record<SectionId, NavItem>
);

// ── Portfolio categories ──

export interface PortfolioCategory {
  id: string;
  label: string;
  description: string;
}

export const portfolioCategories: PortfolioCategory[] = [
  { id: 'ai-image-gen', label: 'AI Image Generation', description: 'Original imagery generated from crafted prompts and references.' },
  { id: 'ai-image-edit', label: 'AI Image Editing / Design', description: 'Refinement, compositing, and design-driven image editing.' },
  { id: 'ai-video-gen', label: 'AI Video Generation', description: 'Motion pieces produced through generative video tools.' },
  { id: 'ai-motion', label: 'AI Image-to-Video / Motion', description: 'Animating still images into living sequences.' },
  { id: 'ai-advertising', label: 'AI Advertising Concepts', description: 'Concept-led advertising visuals and campaigns.' },
  { id: 'prompt-dev', label: 'Prompt Development', description: 'Systematic prompt engineering for repeatable visual quality.' },
  { id: 'storyboarding', label: 'Storyboarding & Visual Planning', description: 'Sequencing ideas into coherent visual narratives.' },
  { id: 'worldbuilding', label: 'Character / Worldbuilding', description: 'Characters and worlds developed as cohesive systems.' },
  { id: 'graphic-design', label: 'Graphic Design', description: 'Layout, typography, and identity design work.' },
  { id: 'creative-production', label: 'Creative Production', description: 'End-to-end creative production and direction.' },
];

// ── Portfolio items (Selected Work) ──
// Empty until real work is added. Each item supports all fields
// needed by the future admin system.

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image?: string;
  video?: string;
  projectLink?: string;
  featured: boolean;
  published: boolean;
}

export const portfolioItems: PortfolioItem[] = [];

// ── Experiment items ──

export interface ExperimentItem {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image?: string;
  video?: string;
  published: boolean;
}

export const experimentItems: ExperimentItem[] = [];

// ── Project case studies ──

export interface ProjectCaseStudy {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  tags: string[];
  published: boolean;
  featured: boolean;
}

export const projects: ProjectCaseStudy[] = [
  {
    slug: 'edupulse',
    title: 'EduPulse Hubs',
    tagline: 'Flagship case study — coming soon',
    description: 'A detailed case study for EduPulse Hubs will be added here. This architecture is prepared for future content.',
    category: 'Product / Experience',
    tags: ['coming-soon'],
    published: false,
    featured: true,
  },
];

// ── Owner profile ──
// [EDITABLE] — All fields below are placeholders. Replace with real
// information when available. Nothing here should be treated as real.

export interface ContactChannel {
  label: string;
  value: string | null; // null = not yet provided
  href: string | null;
}

export interface ExperienceEntry {
  role: string | null;
  organization: string | null;
  period: string | null;
  description: string | null;
}

export interface EducationEntry {
  qualification: string | null;
  institution: string | null;
  period: string | null;
  description: string | null;
}

export const owner = {
  name: 'Pratham Chhabra',
  // [EDITABLE] — replace with real professional title
  role: null as string | null,
  // [EDITABLE] — replace with real intro tagline
  tagline: null as string | null,
  // [EDITABLE] — replace with real bio paragraphs
  bio: [] as string[],
  // [EDITABLE] — replace with real skills
  skills: [] as string[],
  // [EDITABLE] — replace with real tools / workflow
  tools: [] as string[],
  // [EDITABLE] — resume link
  resumeUrl: null as string | null,
  // [EDITABLE] — contact channels
  contact: {
    email: null as string | null,
    channels: [] as ContactChannel[],
  },
  // [EDITABLE] — experience entries
  experience: [] as ExperienceEntry[],
  // [EDITABLE] — education entries
  education: [] as EducationEntry[],
};

// ── Reven Eye gateway ──
// PRAfolio only links to Reven Eye. No Reven Eye content lives here.

export const revenEyeGateway = {
  title: 'Reven Eye',
  subtitle: 'A separate creator ecosystem',
  description:
    'Reven Eye is a distinct creative ecosystem that lives outside PRAfolio. This is a gateway, not a destination — all creator and commercial features are hosted there.',
  // [EDITABLE] — replace with real Reven Eye URL when available
  link: null as string | null,
};
