'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/Button/Button';
import { FormField } from '@/components/ui/FormField/FormField';
import { Input } from '@/components/ui/Input/Input';
import { SIGN_UP_FORM_FIELDS } from '@/constants/auth.constant';
import { ROUTES } from '@/constants/routes.constant';

import { useRegisterForm } from './hooks/useRegisterForm';
import styles from './RegisterForm.module.scss';

const RegisterForm = () => {
  const { register, submit, errors, isValid, isPending, isSubmitting, isConfirmationSent } = useRegisterForm();

  if (isConfirmationSent) {
    return (
      <div className={styles.confirmation}>
        <div className={styles.confirmationIcon}>✉️</div>
        <h1 className={styles.title}>Check your email</h1>
        <p className={styles.confirmationText}>
          We sent a confirmation link to your email address. Please click it to activate your account.
        </p>
        <Link className={styles.backLink} href={ROUTES.LOGIN}>
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.heading}>
        <h1 className={styles.title}>Create account</h1>
        <p className={styles.subtitle}>Fill in the details below to get started</p>
      </div>

      <FormField.Root>
        <FormField.Label htmlFor={SIGN_UP_FORM_FIELDS.EMAIL}>Email</FormField.Label>
        <Input
          id={SIGN_UP_FORM_FIELDS.EMAIL}
          type="email"
          placeholder="Enter your email"
          hasError={Boolean(errors.email?.message)}
          {...register(SIGN_UP_FORM_FIELDS.EMAIL)}
        />
        <FormField.Error>{errors.email?.message}</FormField.Error>
      </FormField.Root>

      <FormField.Root>
        <FormField.Label htmlFor={SIGN_UP_FORM_FIELDS.PASSWORD}>Password</FormField.Label>
        <Input
          id={SIGN_UP_FORM_FIELDS.PASSWORD}
          type="password"
          placeholder="At least 8 characters"
          hasError={Boolean(errors.password?.message)}
          {...register(SIGN_UP_FORM_FIELDS.PASSWORD)}
        />
        <FormField.Error>{errors.password?.message}</FormField.Error>
      </FormField.Root>

      <FormField.Root>
        <FormField.Label htmlFor={SIGN_UP_FORM_FIELDS.CONFIRM_PASSWORD}>Confirm password</FormField.Label>
        <Input
          id={SIGN_UP_FORM_FIELDS.CONFIRM_PASSWORD}
          type="password"
          placeholder="Repeat your password"
          hasError={Boolean(errors.confirmPassword?.message)}
          {...register(SIGN_UP_FORM_FIELDS.CONFIRM_PASSWORD)}
        />
        <FormField.Error>{errors.confirmPassword?.message}</FormField.Error>
      </FormField.Root>

      <Button disabled={!isValid || isPending || isSubmitting} type="submit">
        {isPending || isSubmitting ? 'Creating account...' : 'Create account'}
      </Button>

      <p className={styles.loginLink}>
        Already have an account? <Link href={ROUTES.LOGIN}>Log in</Link>
      </p>
    </form>
  );
};

export { RegisterForm };
