import type { USER_ROLES, USER_STATUSES } from '@/constants/user.constant';
import type { updateUserSchema } from '@/schemas/user.schema';

import type { TNullable, TValueOf, TZodInfer } from './utility.type';

type TUserRole = TValueOf<typeof USER_ROLES>;

type TUserStatus = TValueOf<typeof USER_STATUSES>;

type TSidebarUser = {
  id: string;
  email: string;
};

type TUser = TSidebarUser & {
  full_name: string;
  first_name: string;
  last_name: string;
  phone: TNullable<string>;
  role: TUserRole;
  status: TUserStatus;
  created_at: string;
  updated_at: string;
};

type TUpdateUserFormValues = TZodInfer<typeof updateUserSchema>;

type TUserFormErrors = Partial<
  Record<'first_name' | 'last_name' | 'email' | 'phone' | 'role' | 'status' | 'id', string[]>
>;

type TUpdateUserState = {
  errors?: TUserFormErrors;
  error?: string;
  success?: boolean;
};

export type { TUserRole, TUserStatus, TSidebarUser, TUser, TUpdateUserFormValues, TUserFormErrors, TUpdateUserState };
