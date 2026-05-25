import type { z, ZodType } from 'zod';

type TNullable<T> = T | null;

type TOptional<T> = T | undefined;

type TKey<T> = keyof T;

type TValueOf<T> = T[TKey<T>];

type TZodInfer<T extends ZodType> = z.infer<T>;

type TFieldErrorsFrom<T> = Partial<Record<TKey<T>, string[]>>;

export type { TNullable, TKey, TValueOf, TZodInfer, TOptional, TFieldErrorsFrom };
