'use server';

import { revalidatePath } from 'next/cache';

import { ROUTES } from '@/constants/routes.constant';
import { USER_FORM_FIELDS } from '@/constants/user.constant';
import { sendN8nNotification } from '@/lib/n8n/sendN8nNotification';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { updateUserSchema } from '@/schemas/user.schema';
import type { TUpdateUserState } from '@/types/user.type';
import { getZodFieldErrors } from '@/utils/getZodFieldErrors';

const updateUser = async (_state: TUpdateUserState, formData: FormData): Promise<TUpdateUserState> => {
  const supabase = await createSupabaseServerClient();

  const rawData = {
    id: formData.get(USER_FORM_FIELDS.ID),
    first_name: formData.get(USER_FORM_FIELDS.FIRST_NAME),
    last_name: formData.get(USER_FORM_FIELDS.LAST_NAME),
    email: formData.get(USER_FORM_FIELDS.EMAIL),
    phone: formData.get(USER_FORM_FIELDS.PHONE),
    role: formData.get(USER_FORM_FIELDS.ROLE),
    status: formData.get(USER_FORM_FIELDS.STATUS),
  };

  const parsed = updateUserSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      errors: getZodFieldErrors(parsed.error),
      error: undefined,
      success: false,
    };
  }

  const { id, first_name, last_name, email, phone, role, status } = parsed.data;

  const normalizedPhone = phone?.trim() ? phone.trim() : null;

  const { error } = await supabase
    .from('users')
    .update({
      first_name,
      last_name,
      email,
      phone: normalizedPhone,
      role,
      status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) {
    return {
      errors: {},
      error: error.message,
      success: false,
    };
  }

  await sendN8nNotification({
    message:
      `✏️ User updated\n` +
      `Name: ${first_name} ${last_name}\n` +
      `Email: ${email}\n` +
      `Role: ${role}\n` +
      `Status: ${status}`,
  });

  revalidatePath(ROUTES.USERS);
  revalidatePath(`${ROUTES.USERS}/${id}`);

  return {
    errors: {},
    error: undefined,
    success: true,
  };
};

export { updateUser };
