import cn from 'classnames';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './Button.module.scss';

type TButtonVariant = 'primary' | 'secondary';

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: TButtonVariant;
};

const Button = ({ children, className, type = 'button', variant = 'primary', ...props }: TButtonProps) => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: variant === 'primary',
        [styles.secondary]: variant === 'secondary',
      })}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
