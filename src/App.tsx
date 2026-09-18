import { useState, useEffect, useRef, useCallback } from 'react';
import { LivingCreativeUniverse } from '@/three/LivingCreativeUniverse';
import type { InteractionState } from '@/three/interaction';
import { Navigation } from '@/components/Navigation';
import {
  IntroductionSection,
  WorkSection,
  ExperimentsSection,
  ProjectsSection,
  AboutSection,
  ResumeSection,
  ContactSection,
  RevenEyeSection,
} from '@/components/Sections';
import { ProjectCaseStudy } from '@/components/ProjectCaseStudy';
import { useRoute, useNavigate } from '@/router';
import { navItems, type SectionId } from '@/data/content';

function parseSectionFromPath(path: string): SectionId {
  const match = path.match(/^\/([a-z-]+)/);
  if (match) {
    const id = match[1] as SectionId;
    if (navItems.some((item) => item.id === id)) return id;
  }
  return 'introduction';
}

const stateLabels: Record<InteractionState, string> = {
  observing: 'Observing',
  exploring: 'Exploring',
  focus: 'Focus',
  impact: 'Impact',
  idle: 'Idle',
};

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const universeRef = useRef<LivingCreativeUniverse | null>(null);
  const [interactionState, setInteractionState] = useState<InteractionState>('observing');
  const { path, params } = useRoute();
  const navigate = useNavigate();

  const isProjectPage = path.startsWith('/projects/') && params.slug;
  const activeSection = isProjectPage ? 'projects' : parseSectionFromPath(path);
  const activeIndex = navItems.find((item) => item.id === activeSection)?.index ?? -1;

  useEffect(() => {
    if (!canvasRef.current) return;
    const universe = new LivingCreativeUniverse(canvasRef.current, {
      onStateChange: (state) => setInteractionState(state),
    });
    universeRef.current = universe;
    return () => universe.destroy();
  }, []);

  useEffect(() => {
    universeRef.current?.setActiveSection(activeIndex);
  }, [activeIndex]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    universeRef.current?.pointerMove(x, y);
  }, []);

  const handlePointerLeave = useCallback(() => {
    universeRef.current?.pointerLeave();
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    universeRef.current?.click(x, y);
  }, []);

  useEffect(() => {
    const handler = () => universeRef.current?.scroll(window.scrollY);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNavigate = useCallback((id: SectionId) => {
    navigate(`/${id}`);
  }, [navigate]);

  const renderSection = () => {
    switch (activeSection) {
      case 'introduction':
        return <IntroductionSection onNavigate={handleNavigate} />;
      case 'work':
        return <WorkSection />;
      case 'experiments':
        return <ExperimentsSection />;
      case 'projects':
        return <ProjectsSection onNavigate={handleNavigate} />;
      case 'about':
        return <AboutSection />;
      case 'resume':
        return <ResumeSection />;
      case 'contact':
        return <ContactSection />;
      case 'reven-eye':
        return <RevenEyeSection />;
      default:
        return <IntroductionSection onNavigate={handleNavigate} />;
    }
  };

  return (
    <div
      className="relative min-h-screen"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-0"
        aria-hidden="true"
      />

      <div className="fixed inset-0 z-10 pointer-events-none bg-gradient-to-b from-ink-950/40 via-transparent to-ink-950/60" />

      <div
        className="fixed top-20 lg:top-6 right-4 lg:right-8 z-30 pointer-events-none"
        aria-hidden="true"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-mono text-cream-400">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          {stateLabels[interactionState]}
        </div>
      </div>

      <Navigation activeSection={activeSection} onNavigate={handleNavigate} />

      <main
        className="relative z-20 lg:ml-64 min-h-screen"
        id="main-content"
      >
        {isProjectPage ? (
          <ProjectCaseStudy />
        ) : (
          <div className="px-5 sm:px-8 lg:px-16 py-20 lg:py-32 max-w-6xl">
            <div key={activeSection} className="animate-fade-up">
              {renderSection()}
            </div>
          </div>
        )}
      </main>

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-500 focus:text-ink-950 focus:rounded-lg focus:text-sm"
      >
        Skip to content
      </a>
    </div>
  );
}
