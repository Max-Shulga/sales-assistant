'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { signIn } from '@/actions/auth';
import { SIGN_IN_FORM_DEFAULT_VALUES, SIGN_IN_FORM_FIELDS, SIGN_IN_INITIAL_STATE } from '@/constants/auth.constant';
import { signInSchema } from '@/schemas/auth.schema';
import type { TActionState, TSignInFormValues } from '@/types/auth.type';
import { applyServerFieldErrors } from '@/utils/applyServerFieldErrors';

const useLoginForm = () => {
  const [serverState, formAction, isPending] = useActionState<TActionState, FormData>(signIn, SIGN_IN_INITIAL_STATE);

  const form = useForm<TSignInFormValues>({
    resolver: zodResolver(signInSchema),
    mode: 'onTouched',
    defaultValues: SIGN_IN_FORM_DEFAULT_VALUES,
  });

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid, isSubmitting },
  } = form;

  useEffect(() => {
    if (!serverState.errors || Object.keys(serverState.errors).length === 0) {
      return;
    }

    applyServerFieldErrors<TSignInFormValues>(serverState.errors, setError);
  }, [serverState.errors, setError]);

  useEffect(() => {
    if (!serverState.error) {
      return;
    }

    toast.error(serverState.error);
  }, [serverState.error]);

  const submit = handleSubmit((values) => {
    clearErrors();

    const formData = new FormData();

    formData.append(SIGN_IN_FORM_FIELDS.EMAIL, values.email);
    formData.append(SIGN_IN_FORM_FIELDS.PASSWORD, values.password);

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
  };
};

export { useLoginForm };
