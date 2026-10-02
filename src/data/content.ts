// ─────────────────────────────────────────────
// PRAfolio content
// ─────────────────────────────────────────────

export type SectionId =
  | 'introduction'
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
  { id: 'about', number: '02', german: 'ZWEI', title: 'About', index: 1 },
  { id: 'resume', number: '03', german: 'DREI', title: 'Resume', index: 2 },
  { id: 'contact', number: '04', german: 'VIER', title: 'Contact', index: 3 },
  { id: 'reven-eye', number: '05', german: 'FÜNF', title: 'Reven Eye', index: 4 },
];

export const navMap: Record<SectionId, NavItem> = navItems.reduce(
  (acc, item) => ({ ...acc, [item.id]: item }),
  {} as Record<SectionId, NavItem>
);

export interface CapabilityGroup {
  title: string;
  items: string[];
}

export const owner = {
  name: 'Pratham Chhabra',
  role: 'Creative Technologist & AI-Assisted Visual Producer',
  tagline: 'I build living visual systems where craft meets experimentation.',
  bio: [
    'I am a creative AI-focused content creator who uses generative AI to turn ideas into visual content and practical digital experiences.',
    'I use AI as part of a creative production workflow rather than simply generating random outputs. My work can involve taking an idea from concept through visual development, image generation, image editing, motion/video, and final presentation.',
  ],
  creativeFocus: [
    'AI-generated images',
    'AI-assisted video creation',
    'AI-assisted website design',
    'Visual storytelling',
    'Creative concept development',
    'Prompt development',
    'Storyboarding',
    'Visual direction',
    'Character and worldbuilding',
  ],
  workflow: [
    { stage: 'Concept', description: 'Developing the initial creative idea and direction.' },
    { stage: 'Visual Development', description: 'Building the visual language, references, and structure.' },
    { stage: 'Image Generation', description: 'Crafting prompts and generating source imagery.' },
    { stage: 'Image Editing', description: 'Refining, compositing, and polishing generated visuals.' },
    { stage: 'Motion / Video', description: 'Animating stills into living sequences.' },
    { stage: 'Final Presentation', description: 'Delivering the finished visual experience.' },
  ],
  tools: ['ChatGPT', 'DALL-E', 'Qwen Studio', 'Google AI Tools'],
  languages: [
    'English',
    'Hindi',
    'German — studied up to B2.1',
  ],
  education: [
    'BA Programme — Political Science with Economics',
    'Delhi University, School of Open Learning',
    'University student — Expected graduation: 2028',
  ],
  portfolioUrl: 'https://drive.google.com/drive/folders/17lKhpoqiq_NA6pOdDSCj1QAic45Thl9h',
  resumeUrl: 'https://drive.google.com/file/d/1DTrWMyIjKZmKUghE1APQUw8cus6Ym6_7/view?usp=drivesdk',
  contact: {
    email: 'chhabrapratham435@gmail.com',
    phone: '9910687171',
  },
};

export const revenEyeGateway = {
  title: 'REVEN EYE',
  subtitle: 'Creator ecosystem currently in development.',
  description:
    'Reven Eye is a separate creator ecosystem being built independently from PRAfolio. When it is ready, its real link will appear here.',
};