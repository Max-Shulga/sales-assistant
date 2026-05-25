import type { TUpdateUserState } from '@/types/user.type';

const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
} as const;

const USER_STATUSES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
} as const;

const USER_FORM_FIELDS = {
  ID: 'id',
  FIRST_NAME: 'first_name',
  LAST_NAME: 'last_name',
  EMAIL: 'email',
  PHONE: 'phone',
  ROLE: 'role',
  STATUS: 'status',
} as const;

const USER_FORM_ERRORS = {
  INVALID_ID: 'Invalid user id',
  FIRST_NAME_REQUIRED: 'First name is required',
  LAST_NAME_REQUIRED: 'Last name is required',
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_INVALID: 'Invalid email address',
  ROLE_INVALID: 'Invalid role value',
  STATUS_INVALID: 'Invalid status value',
  INVALID_FORM: 'Invalid form data',
} as const;

const INITIAL_STATE: TUpdateUserState = {
  errors: {},
  error: undefined,
  success: false,
};

const ROLE_OPTIONS = [
  { label: 'Admin', value: USER_ROLES.ADMIN },
  { label: 'Manager', value: USER_ROLES.MANAGER },
  { label: 'User', value: USER_ROLES.USER },
] as const;

const STATUS_OPTIONS = [
  { label: 'Active', value: USER_STATUSES.ACTIVE },
  { label: 'Inactive', value: USER_STATUSES.INACTIVE },
  { label: 'Pending', value: USER_STATUSES.PENDING },
] as const;

export { USER_ROLES, USER_STATUSES, USER_FORM_FIELDS, USER_FORM_ERRORS, INITIAL_STATE, ROLE_OPTIONS, STATUS_OPTIONS };
