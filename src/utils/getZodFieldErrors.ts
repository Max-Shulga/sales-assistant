import type { ZodError } from 'zod';

export type TFieldErrorsFrom<T extends Record<string, unknown>> = Partial<Record<Extract<keyof T, string>, string[]>>;

const getZodFieldErrors = <T extends Record<string, unknown>>(error: ZodError<T>): TFieldErrorsFrom<T> => {
  return error.issues.reduce<TFieldErrorsFrom<T>>((acc, issue) => {
    const field = issue.path[0];

    if (typeof field !== 'string') {
      return acc;
    }

    const key = field as Extract<keyof T, string>;
    const currentFieldErrors = acc[key] ?? [];

    acc[key] = [...currentFieldErrors, issue.message];

    return acc;
  }, {});
};

export { getZodFieldErrors };
