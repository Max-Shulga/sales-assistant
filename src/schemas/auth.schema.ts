import { z } from 'zod';

import { SIGN_IN_FIELD_ERRORS, SIGN_UP_FIELD_ERRORS } from '@/constants/auth.constant';

const signInSchema = z.object({
  email: z.email(SIGN_IN_FIELD_ERRORS.EMAIL),
  password: z.string().min(6, SIGN_IN_FIELD_ERRORS.PASSWORD),
});

const signUpSchema = z
  .object({
    email: z.email(SIGN_UP_FIELD_ERRORS.EMAIL),
    password: z.string().min(8, SIGN_UP_FIELD_ERRORS.PASSWORD),
    confirmPassword: z.string().min(1, SIGN_UP_FIELD_ERRORS.CONFIRM_PASSWORD),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: SIGN_UP_FIELD_ERRORS.PASSWORDS_MISMATCH,
    path: ['confirmPassword'],
  });

export { signInSchema, signUpSchema };
