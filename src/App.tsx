import { useState, useEffect, useRef, useCallback } from 'react';
import { LivingCreativeUniverse } from '@/three/LivingCreativeUniverse';
import type { InteractionState } from '@/three/interaction';
import { Navigation } from '@/components/Navigation';
import {
  IntroductionSection,
  AboutSection,
  ResumeSection,
  ContactSection,
  RevenEyeSection,
} from '@/components/Sections';
import { navItems, type SectionId } from '@/data/content';

const sectionIds: SectionId[] = navItems.map((item) => item.id);

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
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const scrollRafRef = useRef<number>(0);
  const [interactionState, setInteractionState] = useState<InteractionState>('observing');
  const [activeSection, setActiveSection] = useState<SectionId>('introduction');

  useEffect(() => {
    if (!canvasRef.current) return;
    const universe = new LivingCreativeUniverse(canvasRef.current, {
      onStateChange: (state) => setInteractionState(state),
    });
    universeRef.current = universe;
    return () => universe.destroy();
  }, []);

  // Scroll spy — single threshold to minimize callback frequency
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const id = visible[0].target.id as SectionId;
          if (sectionIds.includes(id)) {
            setActiveSection((prev) => (prev === id ? prev : id));
          }
        }
      },
      { threshold: [0.4], rootMargin: '-15% 0px -35% 0px' }
    );

    sectionRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Update universe active section for focus effect
  useEffect(() => {
    const idx = navItems.findIndex((item) => item.id === activeSection);
    universeRef.current?.setActiveSection(idx);
  }, [activeSection]);

  // Scroll → universe: use rAF to batch scroll updates, never write to GL from scroll handler directly
  useEffect(() => {
    const handler = () => {
      if (scrollRafRef.current) return; // already scheduled
      scrollRafRef.current = requestAnimationFrame(() => {
        scrollRafRef.current = 0;
        universeRef.current?.scroll(window.scrollY);
      });
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => {
      window.removeEventListener('scroll', handler);
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    };
  }, []);

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

  const handleNavigate = useCallback((id: SectionId) => {
    const el = sectionRefs.current.get(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const setSectionRef = useCallback((id: SectionId) => (el: HTMLElement | null) => {
    if (el) sectionRefs.current.set(id, el);
  }, []);

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

      <div className="fixed inset-0 z-10 pointer-events-none bg-gradient-to-b from-ink-950/30 via-transparent to-ink-950/50" />

      <Navigation activeSection={activeSection} onNavigate={handleNavigate} />

      <div
        className="fixed bottom-4 right-4 z-30 pointer-events-none"
        aria-hidden="true"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-mono text-cream-400">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          {stateLabels[interactionState]}
        </div>
      </div>

      <main id="main-content" className="relative z-20">
        <section
          id="introduction"
          ref={setSectionRef('introduction')}
          className="min-h-screen flex items-center px-5 sm:px-8 lg:px-16 pt-20 pb-16"
        >
          <div className="max-w-6xl w-full">
            <IntroductionSection onNavigate={handleNavigate} />
          </div>
        </section>

        <section
          id="about"
          ref={setSectionRef('about')}
          className="min-h-screen flex items-center px-5 sm:px-8 lg:px-16 py-20"
        >
          <div className="max-w-6xl w-full">
            <AboutSection />
          </div>
        </section>

        <section
          id="resume"
          ref={setSectionRef('resume')}
          className="min-h-screen flex items-center px-5 sm:px-8 lg:px-16 py-20"
        >
          <div className="max-w-6xl w-full">
            <ResumeSection />
          </div>
        </section>

        <section
          id="contact"
          ref={setSectionRef('contact')}
          className="min-h-screen flex items-center px-5 sm:px-8 lg:px-16 py-20"
        >
          <div className="max-w-6xl w-full">
            <ContactSection />
          </div>
        </section>

        <section
          id="reven-eye"
          ref={setSectionRef('reven-eye')}
          className="min-h-screen flex items-center px-5 sm:px-8 lg:px-16 py-20"
        >
          <div className="max-w-6xl w-full">
            <RevenEyeSection />
          </div>
        </section>
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
