import type { ReactNode } from 'react';

import { AppLogo } from '@/components/ui/AppLogo/AppLogo';
import { AuthIllustration } from '@/components/ui/AuthIllustration/AuthIllustration';
import { ThemeToggle } from '@/components/ui/ThemeToggle/ThemeToggle';

import styles from './PublicLayout.module.scss';

type TPublicLayoutProps = {
  children: ReactNode;
};

const PublicLayout = ({ children }: TPublicLayoutProps) => {
  return (
    <div className={styles.root}>
      {/* ── Left: form panel ──────────────────────────────────── */}
      <div className={styles.formPanel}>
        <div className={styles.formPanelHeader}>
          <AppLogo />
          <ThemeToggle compact />
        </div>

        <div className={styles.formContent}>{children}</div>
      </div>

      {/* ── Right: illustration ───────────────────────────────── */}
      <div className={styles.illustrationPanel}>
        <AuthIllustration />
      </div>
    </div>
  );
};

export default PublicLayout;
