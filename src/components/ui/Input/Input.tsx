import cn from 'classnames';
import type { InputHTMLAttributes } from 'react';

import styles from './Input.module.scss';

type TInputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

const Input = ({ className, hasError, ...props }: TInputProps) => {
  return (
    <input
      className={cn(styles.input, className, {
        [styles.error]: hasError,
      })}
      {...props}
    />
  );
};

export { Input };
