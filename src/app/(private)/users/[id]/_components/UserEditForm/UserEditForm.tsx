'use client';

import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/Button/Button';
import { FormField } from '@/components/ui/FormField/FormField';
import { Input } from '@/components/ui/Input/Input';
import { Select } from '@/components/ui/Select/Select';
import { ROLE_OPTIONS, STATUS_OPTIONS, USER_FORM_FIELDS } from '@/constants/user.constant';
import type { TUser } from '@/types/user.type';

import { useUserEditForm } from './hooks/useUserEditForm';
import styles from './UserEditForm.module.scss';

type TUserEditFormProps = {
  user: TUser;
};

const UserEditForm = ({ user }: TUserEditFormProps) => {
  const { form, submit, resetToInitial, isPending, isSubmitting } = useUserEditForm({ user });

  const {
    control,
    register,
    formState: { errors, isDirty, isValid },
  } = form;

  return (
    <form className={styles.form} onSubmit={submit}>
      <input type="hidden" {...register(USER_FORM_FIELDS.ID)} />

      <div className={styles.grid}>
        <FormField.Root>
          <FormField.Label htmlFor={USER_FORM_FIELDS.FIRST_NAME}>First Name</FormField.Label>

          <Input
            id={USER_FORM_FIELDS.FIRST_NAME}
            hasError={Boolean(errors.first_name?.message)}
            {...register(USER_FORM_FIELDS.FIRST_NAME)}
          />

          <FormField.Error>{errors.first_name?.message}</FormField.Error>
        </FormField.Root>

        <FormField.Root>
          <FormField.Label htmlFor={USER_FORM_FIELDS.LAST_NAME}>Last Name</FormField.Label>

          <Input
            id={USER_FORM_FIELDS.LAST_NAME}
            hasError={Boolean(errors.last_name?.message)}
            {...register(USER_FORM_FIELDS.LAST_NAME)}
          />

          <FormField.Error>{errors.last_name?.message}</FormField.Error>
        </FormField.Root>

        <FormField.Root>
          <FormField.Label htmlFor={USER_FORM_FIELDS.EMAIL}>Email</FormField.Label>

          <Input
            id={USER_FORM_FIELDS.EMAIL}
            type="email"
            hasError={Boolean(errors.email?.message)}
            {...register(USER_FORM_FIELDS.EMAIL)}
          />

          <FormField.Error>{errors.email?.message}</FormField.Error>
        </FormField.Root>

        <FormField.Root>
          <FormField.Label htmlFor={USER_FORM_FIELDS.PHONE}>Phone</FormField.Label>

          <Input
            id={USER_FORM_FIELDS.PHONE}
            hasError={Boolean(errors.phone?.message)}
            {...register(USER_FORM_FIELDS.PHONE)}
          />

          <FormField.Error>{errors.phone?.message}</FormField.Error>
        </FormField.Root>

        <FormField.Root>
          <FormField.Label htmlFor={USER_FORM_FIELDS.ROLE}>Role</FormField.Label>

          <Controller
            control={control}
            name={USER_FORM_FIELDS.ROLE}
            render={({ field }) => (
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
                options={ROLE_OPTIONS}
                placeholder="Select role"
              />
            )}
          />

          <FormField.Error>{errors.role?.message}</FormField.Error>
        </FormField.Root>

        <FormField.Root>
          <FormField.Label htmlFor={USER_FORM_FIELDS.STATUS}>Status</FormField.Label>

          <Controller
            control={control}
            name={USER_FORM_FIELDS.STATUS}
            render={({ field }) => (
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
                options={STATUS_OPTIONS}
                placeholder="Select status"
              />
            )}
          />

          <FormField.Error>{errors.status?.message}</FormField.Error>
        </FormField.Root>
      </div>

      <div className={styles.actions}>
        <Button
          type="button"
          variant="secondary"
          disabled={!isDirty || isPending || isSubmitting}
          onClick={resetToInitial}
        >
          Reset
        </Button>

        <Button type="submit" disabled={!isDirty || !isValid || isPending || isSubmitting}>
          {isPending || isSubmitting ? 'Saving...' : 'Save changes'}
        </Button>
      </div>
    </form>
  );
};

export { UserEditForm };
