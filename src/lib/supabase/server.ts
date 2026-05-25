import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

import { supabaseKey, supabaseUrl } from '@/config/env';

const createSupabaseServerClient = async () => {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {}
      },
    },
  });
};

export { createSupabaseServerClient };
