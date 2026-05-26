'use client';

import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/contexts/ThemeContext';

import styles from './ThemeToggle.module.scss';

type TThemeToggleProps = {
  compact?: boolean;
};

const ThemeToggle = ({ compact = false }: TThemeToggleProps) => {
  const { theme, toggleTheme, mounted } = useTheme();

  const isDark = theme === 'dark';

  if (!mounted) {
    return (
      <button className={compact ? styles.toggleCompact : styles.toggle} aria-label="Toggle theme" disabled>
        <Moon size={18} />
        {!compact && <span>Dark mode</span>}
      </button>
    );
  }

  return (
    <button
      className={compact ? styles.toggleCompact : styles.toggle}
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
      {!compact && <span>{isDark ? 'Light mode' : 'Dark mode'}</span>}
    </button>
  );
};

export { ThemeToggle };
