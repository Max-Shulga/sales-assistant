import cn from 'classnames';
import type { ReactNode } from 'react';

import styles from './FormField.module.scss';

type TFormFieldRootProps = {
  children: ReactNode;
  className?: string;
};

type TFormFieldLabelProps = {
  children: ReactNode;
  htmlFor: string;
  className?: string;
};

type TFormFieldErrorProps = {
  children?: ReactNode;
  className?: string;
};

const Root = ({ children, className }: TFormFieldRootProps) => {
  return <div className={cn(styles.field, className)}>{children}</div>;
};

const Label = ({ children, htmlFor, className }: TFormFieldLabelProps) => {
  return (
    <label className={cn(styles.label, className)} htmlFor={htmlFor}>
      {children}
    </label>
  );
};

const Error = ({ children, className }: TFormFieldErrorProps) => {
  if (!children) {
    return null;
  }

  return <p className={cn(styles.error, className)}>{children}</p>;
};

const FormField = {
  Root,
  Label,
  Error,
};

export { FormField };
