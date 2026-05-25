import type { FieldPath, FieldValues, UseFormSetError } from 'react-hook-form';

import type { TOptional } from '@/types/utility.type';

type TServerFieldErrors<TFieldValues extends FieldValues> = Partial<Record<FieldPath<TFieldValues>, string[]>>;

const applyServerFieldErrors = <TFieldValues extends FieldValues>(
  errors: TOptional<TServerFieldErrors<TFieldValues>>,
  setError: UseFormSetError<TFieldValues>
) => {
  if (!errors) {
    return;
  }

  (Object.entries(errors) as [FieldPath<TFieldValues>, string[]][]).forEach(([fieldName, fieldErrors]) => {
    const message = fieldErrors[0];

    if (!message) {
      return;
    }

    setError(fieldName, {
      type: 'server',
      message,
    });
  });
};

export { applyServerFieldErrors };
