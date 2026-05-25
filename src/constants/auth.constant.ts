import type { TActionState, TRegisterActionState, TSignInFormValues, TSignUpFormValues } from '@/types/auth.type';

const SIGN_IN_FORM_FIELDS = {
  EMAIL: 'email',
  PASSWORD: 'password',
} as const;

const SIGN_IN_FIELD_ERRORS = {
  EMAIL: 'Invalid email',
  PASSWORD: 'Password must be at least 6 characters',
} as const;

const SIGN_IN_FORM_DEFAULT_VALUES: TSignInFormValues = {
  email: '',
  password: '',
};

const SIGN_IN_INITIAL_STATE: TActionState = {
  errors: {},
  error: undefined,
};

// ---------------------------------------------------------------------------

const SIGN_UP_FORM_FIELDS = {
  EMAIL: 'email',
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirmPassword',
} as const;

const SIGN_UP_FIELD_ERRORS = {
  EMAIL: 'Invalid email',
  PASSWORD: 'Password must be at least 8 characters',
  CONFIRM_PASSWORD: 'Please confirm your password',
  PASSWORDS_MISMATCH: 'Passwords do not match',
} as const;

const SIGN_UP_FORM_DEFAULT_VALUES: TSignUpFormValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

const SIGN_UP_INITIAL_STATE: TRegisterActionState = {
  errors: {},
  error: undefined,
  message: undefined,
};

// ---------------------------------------------------------------------------

/** @deprecated Use SIGN_IN_INITIAL_STATE or SIGN_UP_INITIAL_STATE */
const INITIAL_STATE: TActionState = {
  errors: {},
  error: undefined,
};

export {
  SIGN_IN_FORM_FIELDS,
  SIGN_IN_FIELD_ERRORS,
  SIGN_IN_FORM_DEFAULT_VALUES,
  SIGN_IN_INITIAL_STATE,
  SIGN_UP_FORM_FIELDS,
  SIGN_UP_FIELD_ERRORS,
  SIGN_UP_FORM_DEFAULT_VALUES,
  SIGN_UP_INITIAL_STATE,
  INITIAL_STATE,
};
