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

// ── Case study shared types ──
// Used by both Selected Work items and Projects. A work item or
// project can optionally include a full case study; when present,
// the card opens the reusable ProjectCaseStudy view.

export interface WorkflowStep {
  stage: string;
  title: string;
  description: string;
}

export const workflowStages: string[] = [
  'IDEA',
  'PROMPT',
  'GENERATION',
  'SELECTION',
  'EDITING',
  'ANIMATION',
  'FINAL OUTPUT',
];

export interface CreativeDecision {
  title: string;
  rationale: string;
}

export interface CaseStudyData {
  context: string;
  approach: string;
  aiWorkflow: WorkflowStep[];
  creativeDecisions: CreativeDecision[];
  result: string;
  whatILearned: string;
}

// ── Portfolio items (Selected Work) ──
// Each item can carry an optional `caseStudy` object. When present,
// the WorkCard becomes clickable and opens the ProjectCaseStudy view.

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
  caseStudy?: CaseStudyData;
}

// [EDITABLE] — Placeholder portfolio item. Replace title, description,
// and case study content with real work. The structure below demonstrates
// the full case study architecture so the same component can render
// different projects by data alone.

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'placeholder-01',
    title: '[Portfolio title — to be added]',
    description: '[Short description of this piece — to be added]',
    category: 'AI Image Generation',
    tags: ['placeholder'],
    featured: false,
    published: false,
    caseStudy: {
      context: '[Describe the creative problem and what was being created — to be added]',
      approach: '[Describe the approach and visual/creative direction — to be added]',
      aiWorkflow: [
        { stage: 'IDEA', title: 'Idea', description: '[Describe the initial idea — to be added]' },
        { stage: 'PROMPT', title: 'Prompt', description: '[Describe the prompt development — to be added]' },
        { stage: 'GENERATION', title: 'Generation', description: '[Describe the generation process — to be added]' },
        { stage: 'SELECTION', title: 'Selection', description: '[Describe the selection process — to be added]' },
        { stage: 'EDITING', title: 'Editing', description: '[Describe the editing process — to be added]' },
        { stage: 'ANIMATION', title: 'Animation', description: '[Describe the animation process — to be added]' },
        { stage: 'FINAL OUTPUT', title: 'Final Output', description: '[Describe the final output — to be added]' },
      ],
      creativeDecisions: [
        { title: '[Decision title — to be added]', rationale: '[Rationale — to be added]' },
      ],
      result: '[Describe the final result — to be added]',
      whatILearned: '[Describe what was learned — to be added]',
    },
  },
];

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

// ── Project case studies (04 / VIER — Projects) ──
// Larger projects that use the same ProjectCaseStudy component.
// These are separate from Selected Work.

export interface ProjectCaseStudy {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  tags: string[];
  published: boolean;
  featured: boolean;
  caseStudy?: CaseStudyData;
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
    caseStudy: {
      context: '[Describe the creative problem and what was being created — to be added]',
      approach: '[Describe the approach and visual/creative direction — to be added]',
      aiWorkflow: [
        { stage: 'IDEA', title: 'Idea', description: '[Describe the initial idea — to be added]' },
        { stage: 'PROMPT', title: 'Prompt', description: '[Describe the prompt development — to be added]' },
        { stage: 'GENERATION', title: 'Generation', description: '[Describe the generation process — to be added]' },
        { stage: 'SELECTION', title: 'Selection', description: '[Describe the selection process — to be added]' },
        { stage: 'EDITING', title: 'Editing', description: '[Describe the editing process — to be added]' },
        { stage: 'ANIMATION', title: 'Animation', description: '[Describe the animation process — to be added]' },
        { stage: 'FINAL OUTPUT', title: 'Final Output', description: '[Describe the final output — to be added]' },
      ],
      creativeDecisions: [
        { title: '[Decision title — to be added]', rationale: '[Rationale — to be added]' },
      ],
      result: '[Describe the final result — to be added]',
      whatILearned: '[Describe what was learned — to be added]',
    },
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
  resumeUrl: '/assets/resume/Pratham_Chhabra_Resume.pdf',
  // [EDITABLE] — contact channels
  contact: {
    email: null as string | null,
    channels: [] as ContactChannel[],
  },
  experience: [
    {
      role: 'Fresher',
      organization: null,
      period: null,
      description: null,
    },
  ],
  education: [
    {
      qualification: 'BA Programme',
      institution: 'Political Science with Economics',
      period: 'Currently pursuing — Expected completion: 2028',
      description: null,
    },
  ],
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
