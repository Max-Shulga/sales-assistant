'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

type TTheme = 'light' | 'dark';

type TThemeContext = {
  theme: TTheme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<TThemeContext>({
  theme: 'light',
  toggleTheme: () => {},
});

const THEME_KEY = 'theme';

const getInitialTheme = (): TTheme => {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem(THEME_KEY) as TTheme | null;
  const preferred: TTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  return stored ?? preferred;
};

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Lazy initializer — reads localStorage/matchMedia once on mount, never inside an effect
  const [theme, setTheme] = useState<TTheme>(getInitialTheme);

  // Keep the data-theme attribute in sync with React state (external system sync)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: TTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem(THEME_KEY, next);
      return next;
    });
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };
export type { TTheme };
