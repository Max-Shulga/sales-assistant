import { z } from 'zod';

import { USER_FORM_ERRORS, USER_ROLES, USER_STATUSES } from '@/constants/user.constant';

const updateUserSchema = z.object({
  id: z.uuid({ error: USER_FORM_ERRORS.INVALID_ID }),
  full_name: z.string().trim().min(1, { error: USER_FORM_ERRORS.FULL_NAME_REQUIRED }),
  email: z
    .string()
    .trim()
    .min(1, { error: USER_FORM_ERRORS.EMAIL_REQUIRED })
    .pipe(z.email({ error: USER_FORM_ERRORS.EMAIL_INVALID })),
  phone: z.string().trim().optional().or(z.literal('')),
  role: z.enum([USER_ROLES.ADMIN, USER_ROLES.USER], {
    error: USER_FORM_ERRORS.ROLE_INVALID,
  }),
  status: z.enum([USER_STATUSES.ACTIVE, USER_STATUSES.INACTIVE], {
    error: USER_FORM_ERRORS.STATUS_INVALID,
  }),
});

const createUserSchema = z.object({
  full_name: z.string().trim().min(1, { error: USER_FORM_ERRORS.FULL_NAME_REQUIRED }),
  email: z
    .string()
    .trim()
    .min(1, { error: USER_FORM_ERRORS.EMAIL_REQUIRED })
    .pipe(z.email({ error: USER_FORM_ERRORS.EMAIL_INVALID })),
  phone: z.string().trim().optional().or(z.literal('')),
  role: z.enum([USER_ROLES.ADMIN, USER_ROLES.USER], {
    error: USER_FORM_ERRORS.ROLE_INVALID,
  }),
  status: z.enum([USER_STATUSES.ACTIVE, USER_STATUSES.INACTIVE], {
    error: USER_FORM_ERRORS.STATUS_INVALID,
  }),
});

export { updateUserSchema, createUserSchema };
