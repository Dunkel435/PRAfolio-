// Minimal hash-based router.

import { useState, useEffect, useCallback } from 'react';

export function useRoute(): { path: string } {
  const getPath = () => {
    const hash = window.location.hash.replace(/^#/, '');
    return hash || '/';
  };

  const [path, setPath] = useState(getPath());

  useEffect(() => {
    const handler = () => setPath(getPath());
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  return { path };
}

export function useNavigate() {
  return useCallback((to: string) => {
    window.location.hash = to;
    window.scrollTo(0, 0);
  }, []);
}