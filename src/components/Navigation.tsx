import { navItems, type SectionId } from '@/data/content';

interface NavigationProps {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
}

export function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const handleNav = (id: SectionId) => {
    onNavigate(id);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8 pt-3 pb-3">
      {/* Brand — compact dark pill */}
      <button
        onClick={() => handleNav('introduction')}
        className="flex flex-col items-start group glass rounded-xl px-3 py-2 hover:border-amber-500/30 transition-colors flex-shrink-0"
        aria-label="Go to introduction"
      >
        <span className="font-display text-base lg:text-lg font-600 text-cream-50 tracking-tight group-hover:text-amber-400 transition-colors leading-none">
          PRAfolio
        </span>
        <span className="text-[10px] text-cream-500 mt-0.5 tracking-wide leading-none hidden sm:block">
          Pratham Chhabra
        </span>
      </button>

      {/* Navigation — all 5 sections visible, compact horizontal */}
      <nav aria-label="Primary navigation" className="flex items-center gap-1 glass rounded-xl px-1.5 py-1.5 overflow-x-auto max-w-[calc(100vw-8rem)] sm:max-w-none">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNav(item.id)}
            data-active={activeSection === item.id}
            aria-current={activeSection === item.id ? 'page' : undefined}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all duration-300 flex-shrink-0 hover:bg-amber-500/10"
          >
            <span
              className="font-mono text-[10px] font-500 transition-colors"
              style={{ color: activeSection === item.id ? '#e8a838' : '#9a8a6e' }}
            >
              {item.number}
            </span>
            <span
              className="font-display italic text-[11px] lg:text-xs transition-colors hidden md:inline"
              style={{ color: activeSection === item.id ? '#d4c8b0' : '#7a6e58' }}
            >
              {item.german}
            </span>
            <span
              className="font-sans text-[10px] lg:text-xs font-500 uppercase tracking-wider transition-colors"
              style={{ color: activeSection === item.id ? '#faf7f2' : '#b8a888' }}
            >
              {item.title}
            </span>
          </button>
        ))}
      </nav>
    </header>
  );
}
