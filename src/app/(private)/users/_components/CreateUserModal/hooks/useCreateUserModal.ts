'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState, useEffect } from 'react';
import type { DefaultValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { createUser } from '@/actions/user';
import { CREATE_INITIAL_STATE, USER_FORM_FIELDS } from '@/constants/user.constant';
import { createUserSchema } from '@/schemas/user.schema';
import type { TCreateUserFormValues, TCreateUserState } from '@/types/user.type';
import { applyServerFieldErrors } from '@/utils/applyServerFieldErrors';

const DEFAULT_VALUES: DefaultValues<TCreateUserFormValues> = {
  full_name: '',
  email: '',
  phone: '',
  role: undefined,
  status: undefined,
};

type TUseCreateUserModalParams = {
  onClose: () => void;
};

const useCreateUserModal = ({ onClose }: TUseCreateUserModalParams) => {
  const [serverState, formAction, isPending] = useActionState<TCreateUserState, FormData>(
    createUser,
    CREATE_INITIAL_STATE
  );

  const form = useForm<TCreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    mode: 'onChange',
    defaultValues: DEFAULT_VALUES,
  });

  const {
    clearErrors,
    reset,
    setError,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    if (!serverState.errors || Object.keys(serverState.errors).length === 0) {
      return;
    }

    applyServerFieldErrors<TCreateUserFormValues>(serverState.errors, setError);
  }, [serverState.errors, setError]);

  useEffect(() => {
    if (!serverState.error) {
      return;
    }

    toast.error('Failed to create user', { description: serverState.error });
  }, [serverState.error]);

  useEffect(() => {
    if (!serverState.success) {
      return;
    }

    toast.success('User created successfully');
    reset(DEFAULT_VALUES);
    onClose();
  }, [serverState.success, reset, onClose]);

  const handleClose = () => {
    clearErrors();
    reset(DEFAULT_VALUES);
    onClose();
  };

  const submit = handleSubmit((values) => {
    clearErrors();

    const formData = new FormData();

    formData.append(USER_FORM_FIELDS.FULL_NAME, values.full_name);
    formData.append(USER_FORM_FIELDS.EMAIL, values.email);
    formData.append(USER_FORM_FIELDS.PHONE, values.phone ?? '');
    formData.append(USER_FORM_FIELDS.ROLE, values.role);
    formData.append(USER_FORM_FIELDS.STATUS, values.status);

    startTransition(() => {
      formAction(formData);
    });
  });

  return {
    form,
    submit,
    handleClose,
    isPending,
    isSubmitting,
  };
};

export { useCreateUserModal };
