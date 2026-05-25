'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { updateUser } from '@/actions/user';
import { INITIAL_STATE, USER_FORM_FIELDS } from '@/constants/user.constant';
import { updateUserSchema } from '@/schemas/user.schema';
import type { TUpdateUserFormValues, TUpdateUserState, TUser } from '@/types/user.type';
import { applyServerFieldErrors } from '@/utils/applyServerFieldErrors';

type TUseUserEditFormParams = {
  user: TUser;
};

const getDefaultValues = (user: TUser): TUpdateUserFormValues => ({
  id: user.id,
  first_name: user.first_name,
  last_name: user.last_name,
  email: user.email,
  phone: user.phone ?? '',
  role: user.role,
  status: user.status,
});

const useUserEditForm = ({ user }: TUseUserEditFormParams) => {
  const [serverState, formAction, isPending] = useActionState<TUpdateUserState, FormData>(updateUser, INITIAL_STATE);

  const defaultValues = useMemo(() => getDefaultValues(user), [user]);

  const form = useForm<TUpdateUserFormValues>({
    resolver: zodResolver(updateUserSchema),
    mode: 'onChange',
    defaultValues,
  });

  const {
    clearErrors,
    reset,
    setError,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    if (!serverState.errors || Object.keys(serverState.errors).length === 0) {
      return;
    }

    applyServerFieldErrors<TUpdateUserFormValues>(serverState.errors, setError);
  }, [serverState.errors, setError]);

  useEffect(() => {
    if (!serverState.error) {
      return;
    }

    toast.error('Update failed', {
      description: serverState.error,
    });
  }, [serverState.error]);

  useEffect(() => {
    if (!serverState.success) {
      return;
    }

    toast.success('User updated successfully');
    reset(getValues());
  }, [serverState.success, reset, getValues]);

  const submit = handleSubmit((values) => {
    clearErrors();

    const formData = new FormData();

    formData.append(USER_FORM_FIELDS.ID, values.id);
    formData.append(USER_FORM_FIELDS.FIRST_NAME, values.first_name);
    formData.append(USER_FORM_FIELDS.LAST_NAME, values.last_name);
    formData.append(USER_FORM_FIELDS.EMAIL, values.email);
    formData.append(USER_FORM_FIELDS.PHONE, values.phone ?? '');
    formData.append(USER_FORM_FIELDS.ROLE, values.role);
    formData.append(USER_FORM_FIELDS.STATUS, values.status);

    startTransition(() => {
      formAction(formData);
    });
  });

  const resetToInitial = () => {
    clearErrors();
    reset(defaultValues);
  };

  return {
    form,
    submit,
    resetToInitial,
    isPending,
    isSubmitting,
  };
};

export { useUserEditForm };
