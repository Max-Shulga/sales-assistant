'use client';

import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/Button/Button';
import { FormField } from '@/components/ui/FormField/FormField';
import { Input } from '@/components/ui/Input/Input';
import { Modal } from '@/components/ui/Modal/Modal';
import { Select } from '@/components/ui/Select/Select';
import { ROLE_OPTIONS, STATUS_OPTIONS, USER_FORM_FIELDS } from '@/constants/user.constant';

import styles from './CreateUserModal.module.scss';
import { useCreateUserModal } from './hooks/useCreateUserModal';

type TCreateUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateUserModal = ({ isOpen, onClose }: TCreateUserModalProps) => {
  const { form, submit, handleClose, isPending, isSubmitting } = useCreateUserModal({ onClose });

  const {
    control,
    register,
    formState: { errors, isValid },
  } = form;

  return (
    <Modal open={isOpen} onOpenChange={(open) => !open && handleClose()} title="Add User">
      <form className={styles.form} onSubmit={submit}>
        <div className={styles.grid}>
          <FormField.Root>
            <FormField.Label htmlFor={USER_FORM_FIELDS.FULL_NAME}>
              Full Name <span className={styles.required}>*</span>
            </FormField.Label>

            <Input
              id={USER_FORM_FIELDS.FULL_NAME}
              placeholder="John Doe"
              hasError={Boolean(errors.full_name?.message)}
              {...register(USER_FORM_FIELDS.FULL_NAME)}
            />

            <FormField.Error>{errors.full_name?.message}</FormField.Error>
          </FormField.Root>

          <FormField.Root>
            <FormField.Label htmlFor={USER_FORM_FIELDS.EMAIL}>
              Email <span className={styles.required}>*</span>
            </FormField.Label>

            <Input
              id={USER_FORM_FIELDS.EMAIL}
              type="email"
              placeholder="john@example.com"
              hasError={Boolean(errors.email?.message)}
              {...register(USER_FORM_FIELDS.EMAIL)}
            />

            <FormField.Error>{errors.email?.message}</FormField.Error>
          </FormField.Root>

          <FormField.Root>
            <FormField.Label htmlFor={USER_FORM_FIELDS.PHONE}>Phone</FormField.Label>

            <Input
              id={USER_FORM_FIELDS.PHONE}
              placeholder="+1 234 567 8900"
              hasError={Boolean(errors.phone?.message)}
              {...register(USER_FORM_FIELDS.PHONE)}
            />

            <FormField.Error>{errors.phone?.message}</FormField.Error>
          </FormField.Root>

          <FormField.Root>
            <FormField.Label htmlFor={USER_FORM_FIELDS.ROLE}>
              Role <span className={styles.required}>*</span>
            </FormField.Label>

            <Controller
              control={control}
              name={USER_FORM_FIELDS.ROLE}
              render={({ field }) => (
                <Select
                  name={field.name}
                  value={field.value ?? ''}
                  onValueChange={field.onChange}
                  options={ROLE_OPTIONS}
                  placeholder="Select role"
                />
              )}
            />

            <FormField.Error>{errors.role?.message}</FormField.Error>
          </FormField.Root>

          <FormField.Root>
            <FormField.Label htmlFor={USER_FORM_FIELDS.STATUS}>
              Status <span className={styles.required}>*</span>
            </FormField.Label>

            <Controller
              control={control}
              name={USER_FORM_FIELDS.STATUS}
              render={({ field }) => (
                <Select
                  name={field.name}
                  value={field.value ?? ''}
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
          <Button type="button" variant="secondary" disabled={isPending || isSubmitting} onClick={handleClose}>
            Cancel
          </Button>

          <Button type="submit" disabled={!isValid || isPending || isSubmitting}>
            {isPending || isSubmitting ? 'Creating...' : 'Create User'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export { CreateUserModal };
