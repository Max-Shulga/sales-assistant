'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/Button/Button';
import { FormField } from '@/components/ui/FormField/FormField';
import { Input } from '@/components/ui/Input/Input';
import { SIGN_IN_FORM_FIELDS } from '@/constants/auth.constant';
import { ROUTES } from '@/constants/routes.constant';

import { useLoginForm } from './hooks/useLoginForm';
import styles from './LoginForm.module.scss';

const LoginForm = () => {
  const { register, submit, errors, isValid, isPending, isSubmitting } = useLoginForm();

  return (
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.heading}>
        <h1 className={styles.title}>Login</h1>
        <p className={styles.subtitle}>Welcome back — sign in to your account</p>
      </div>

      <FormField.Root>
        <FormField.Label htmlFor={SIGN_IN_FORM_FIELDS.EMAIL}>Email</FormField.Label>
        <Input
          id={SIGN_IN_FORM_FIELDS.EMAIL}
          type="email"
          placeholder="Enter your email"
          hasError={Boolean(errors.email?.message)}
          {...register(SIGN_IN_FORM_FIELDS.EMAIL)}
        />
        <FormField.Error>{errors.email?.message}</FormField.Error>
      </FormField.Root>

      <FormField.Root>
        <FormField.Label htmlFor={SIGN_IN_FORM_FIELDS.PASSWORD}>Password</FormField.Label>
        <Input
          id={SIGN_IN_FORM_FIELDS.PASSWORD}
          type="password"
          placeholder="Enter your password"
          hasError={Boolean(errors.password?.message)}
          {...register(SIGN_IN_FORM_FIELDS.PASSWORD)}
        />
        <FormField.Error>{errors.password?.message}</FormField.Error>
      </FormField.Root>

      <Button disabled={!isValid || isPending || isSubmitting} type="submit">
        {isPending || isSubmitting ? 'Loading...' : 'Log in'}
      </Button>

      <p className={styles.registerLink}>
        Don&apos;t have an account? <Link href={ROUTES.REGISTER}>Create one</Link>
      </p>
    </form>
  );
};

export { LoginForm };
