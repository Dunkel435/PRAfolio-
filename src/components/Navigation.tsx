import { useState, useEffect } from 'react';
import { navItems, type SectionId } from '@/data/content';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
}

export function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNav = (id: SectionId) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Desktop sidebar nav */}
      <nav
        aria-label="Primary navigation"
        className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 flex-col z-40 glass-strong border-r border-ink-700/40"
      >
        <div className="px-6 pt-8 pb-6 border-b border-ink-700/30">
          <button
            onClick={() => handleNav('introduction')}
            className="block text-left group"
            aria-label="Go to introduction"
          >
            <span className="font-display text-xl font-600 text-cream-50 tracking-tight group-hover:text-amber-400 transition-colors">
              PRAfolio
            </span>
            <span className="block text-xs text-cream-500 mt-0.5 tracking-wide">
              Pratham Chhabra
            </span>
          </button>
        </div>

        <ul className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                className="nav-link w-full text-left"
                data-active={activeSection === item.id}
                onClick={() => handleNav(item.id)}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                <span className="nav-link-number">{item.number}</span>
                <span className="flex flex-col flex-1">
                  <span className="nav-link-title">{item.title}</span>
                  <span className="nav-link-german">{item.german}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="px-6 py-4 border-t border-ink-700/30">
          <p className="text-xs text-cream-600 font-mono tracking-wide">
            Living Creative Universe
          </p>
          <p className="text-xs text-ink-400 mt-1">
            v1.0 — Foundation
          </p>
        </div>
      </nav>

      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 glass-strong border-b border-ink-700/40">
        <div className="flex items-center justify-between px-5 h-16">
          <button
            onClick={() => handleNav('introduction')}
            aria-label="Go to introduction"
          >
            <span className="font-display text-lg font-600 text-cream-50">PRAfolio</span>
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="p-2 -mr-2 text-cream-200 hover:text-amber-400 transition-colors"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 glass-strong pt-16 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <ul className="flex flex-col py-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className="nav-link w-full text-left"
                  data-active={activeSection === item.id}
                  onClick={() => handleNav(item.id)}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  <span className="nav-link-number text-base">{item.number}</span>
                  <span className="flex flex-col flex-1">
                    <span className="nav-link-title text-base">{item.title}</span>
                    <span className="nav-link-german">{item.german}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
