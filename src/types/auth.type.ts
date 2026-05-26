import type { signInSchema, signUpSchema } from '@/schemas/auth.schema';

import type { TFieldErrorsFrom, TZodInfer } from './utility.type';

type TSignInData = TZodInfer<typeof signInSchema>;

type TSignInFormValues = TZodInfer<typeof signInSchema>;

type TActionState = {
  errors?: TFieldErrorsFrom<TSignInData>;
  error?: string;
};

type TSignUpData = TZodInfer<typeof signUpSchema>;

type TSignUpFormValues = TZodInfer<typeof signUpSchema>;

type TRegisterActionState = {
  errors?: TFieldErrorsFrom<TSignUpData>;
  error?: string;
  message?: string;
};

export type { TSignInData, TActionState, TSignInFormValues, TSignUpData, TSignUpFormValues, TRegisterActionState };
