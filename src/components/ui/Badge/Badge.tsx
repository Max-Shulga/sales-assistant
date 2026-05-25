import cn from 'classnames';
import type { ReactNode } from 'react';

import styles from './Badge.module.scss';

type TBadgeVariant = 'success' | 'neutral' | 'warning' | 'danger';

type TBadgeProps = {
  children: ReactNode;
  variant?: TBadgeVariant;
};

const Badge = ({ children, variant = 'neutral' }: TBadgeProps) => {
  return (
    <span
      className={cn(styles.badge, {
        [styles.success]: variant === 'success',
        [styles.neutral]: variant === 'neutral',
        [styles.warning]: variant === 'warning',
        [styles.danger]: variant === 'danger',
      })}
    >
      {children}
    </span>
  );
};

export { Badge };
