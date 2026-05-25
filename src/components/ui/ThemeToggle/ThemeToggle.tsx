'use client';

import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/contexts/ThemeContext';

import styles from './ThemeToggle.module.scss';

type TThemeToggleProps = {
  compact?: boolean;
};

const ThemeToggle = ({ compact = false }: TThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';

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
