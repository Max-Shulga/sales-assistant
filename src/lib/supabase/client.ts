import { createBrowserClient } from '@supabase/ssr';

import { supabaseKey, supabaseUrl } from '@/config/env';

const createSupabaseBrowserClient = () => createBrowserClient(supabaseUrl, supabaseKey);

export { createSupabaseBrowserClient };
