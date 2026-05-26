'use client';

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from 'react';

type TTheme = 'light' | 'dark';

type TThemeContext = {
  theme: TTheme;
  toggleTheme: () => void;
  mounted: boolean;
};

const ThemeContext = createContext<TThemeContext>({
  theme: 'light',
  toggleTheme: () => {},
  mounted: false,
});

const THEME_KEY = 'theme';

type Listener = () => void;
const listeners = new Set<Listener>();

function subscribeToTheme(callback: Listener): () => void {
  listeners.add(callback);
  window.addEventListener('storage', callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener('storage', callback);
  };
}

function getThemeSnapshot(): TTheme {
  const stored = localStorage.getItem(THEME_KEY) as TTheme | null;
  const preferred: TTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  return stored ?? preferred;
}

function getThemeServerSnapshot(): TTheme {
  return 'light';
}

function setThemeInStore(next: TTheme): void {
  localStorage.setItem(THEME_KEY, next);
  listeners.forEach((l) => l());
}

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getThemeServerSnapshot);

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const next: TTheme = getThemeSnapshot() === 'light' ? 'dark' : 'light';
    setThemeInStore(next);
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>{children}</ThemeContext.Provider>;
};

const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };
export type { TTheme };
