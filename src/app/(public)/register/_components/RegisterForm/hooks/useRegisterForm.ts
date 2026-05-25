'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { signUp } from '@/actions/auth';
import { SIGN_UP_FORM_DEFAULT_VALUES, SIGN_UP_FORM_FIELDS, SIGN_UP_INITIAL_STATE } from '@/constants/auth.constant';
import { signUpSchema } from '@/schemas/auth.schema';
import type { TRegisterActionState, TSignUpFormValues } from '@/types/auth.type';
import { applyServerFieldErrors } from '@/utils/applyServerFieldErrors';

const useRegisterForm = () => {
  const [serverState, formAction, isPending] = useActionState<TRegisterActionState, FormData>(
    signUp,
    SIGN_UP_INITIAL_STATE
  );

  const form = useForm<TSignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: 'onTouched',
    defaultValues: SIGN_UP_FORM_DEFAULT_VALUES,
  });

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid, isSubmitting },
  } = form;

  useEffect(() => {
    if (!serverState.errors || Object.keys(serverState.errors).length === 0) return;
    applyServerFieldErrors<TSignUpFormValues>(serverState.errors, setError);
  }, [serverState.errors, setError]);

  useEffect(() => {
    if (!serverState.error) return;
    toast.error(serverState.error);
  }, [serverState.error]);

  useEffect(() => {
    if (!serverState.message) return;
    toast.success(serverState.message);
  }, [serverState.message]);

  const submit = handleSubmit((values) => {
    clearErrors();

    const formData = new FormData();
    formData.append(SIGN_UP_FORM_FIELDS.EMAIL, values.email);
    formData.append(SIGN_UP_FORM_FIELDS.PASSWORD, values.password);
    formData.append(SIGN_UP_FORM_FIELDS.CONFIRM_PASSWORD, values.confirmPassword);

    startTransition(() => {
      formAction(formData);
    });
  });

  return {
    register,
    submit,
    errors,
    isValid,
    isPending,
    isSubmitting,
    isConfirmationSent: Boolean(serverState.message),
  };
};

export { useRegisterForm };
