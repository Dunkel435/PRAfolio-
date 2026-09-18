// Minimal hash-based router — no external dependency.
// Supports /projects/:slug for case study pages.

import { useState, useEffect, useCallback, type ReactNode } from 'react';

export interface RouteParams {
  slug?: string;
}

export function useRoute(): { path: string; params: RouteParams } {
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

  const params: RouteParams = {};
  const projectMatch = path.match(/^\/projects\/([^/]+)/);
  if (projectMatch) {
    params.slug = projectMatch[1];
  }

  return { path, params };
}

export function useNavigate() {
  return useCallback((to: string) => {
    window.location.hash = to;
    window.scrollTo(0, 0);
  }, []);
}

export function useParams(): RouteParams {
  const { params } = useRoute();
  return params;
}

export interface RouteProps {
  path: string;
  children: ReactNode;
}
