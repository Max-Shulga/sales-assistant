'use server';

import { redirect } from 'next/navigation';

import { SIGN_IN_FORM_FIELDS, SIGN_UP_FORM_FIELDS } from '@/constants/auth.constant';
import { ROUTES } from '@/constants/routes.constant';
import { sendN8nNotification } from '@/lib/n8n/sendN8nNotification';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { signInSchema, signUpSchema } from '@/schemas/auth.schema';
import type { TActionState, TRegisterActionState } from '@/types/auth.type';
import { getZodFieldErrors } from '@/utils/getZodFieldErrors';

const signIn = async (_state: TActionState, formData: FormData): Promise<TActionState> => {
  const supabase = await createSupabaseServerClient();

  const rawData = {
    email: formData.get(SIGN_IN_FORM_FIELDS.EMAIL),
    password: formData.get(SIGN_IN_FORM_FIELDS.PASSWORD),
  };

  const parsed = signInSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      errors: getZodFieldErrors(parsed.error),
      error: undefined,
    };
  }

  const { email, password } = parsed.data;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return {
      errors: {},
      error: 'Incorrect email or password',
    };
  }

  await sendN8nNotification({ message: `User logged in: ${email}` });

  redirect(ROUTES.USERS);
};

const signUp = async (_state: TRegisterActionState, formData: FormData): Promise<TRegisterActionState> => {
  const supabase = await createSupabaseServerClient();

  const rawData = {
    email: formData.get(SIGN_UP_FORM_FIELDS.EMAIL),
    password: formData.get(SIGN_UP_FORM_FIELDS.PASSWORD),
    confirmPassword: formData.get(SIGN_UP_FORM_FIELDS.CONFIRM_PASSWORD),
  };

  const parsed = signUpSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      errors: getZodFieldErrors(parsed.error),
      error: undefined,
    };
  }

  const { email, password } = parsed.data;

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    console.error('[signUp] Supabase error:', { code: error.code, message: error.message, status: error.status });

    if (error.code === 'user_already_exists') {
      return {
        errors: {},
        error: 'An account with this email already exists',
      };
    }

    return {
      errors: {},
      error: error.message,
    };
  }

  // Email confirmation required — session is null until user confirms
  if (data.user && !data.session) {
    return {
      errors: {},
      error: undefined,
      message: 'Check your email and confirm your registration',
    };
  }

  await sendN8nNotification({ message: `New user registered: ${email}` });

  redirect(ROUTES.USERS);
};

const signOut = async () => {
  const supabase = await createSupabaseServerClient();

  await supabase.auth.signOut();

  redirect(ROUTES.LOGIN);
};

export { signIn, signUp, signOut };
