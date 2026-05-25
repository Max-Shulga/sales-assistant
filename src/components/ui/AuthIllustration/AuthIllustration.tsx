import styles from './AuthIllustration.module.scss';

// No useTheme / no React state — SVG is swapped via CSS [data-theme] selector
// which is set synchronously by the anti-FOUC inline script in layout.tsx.
const AuthIllustration = () => {
  return <div className={styles.panel} />;
};

export { AuthIllustration };
