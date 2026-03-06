import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

let cachedClient: SupabaseClient<Database> | null | undefined;
let cachedUrl: string | undefined;

export function getSupabaseClient(runtimeEnv?: Record<string, string>): SupabaseClient<Database> | null {
  // Accept both Cloudflare runtime env, PUBLIC_* and server-side aliases.
  const supabaseUrl =
    runtimeEnv?.PUBLIC_SUPABASE_URL ||
    import.meta.env.PUBLIC_SUPABASE_URL ||
    import.meta.env.SUPABASE_URL;
  const supabaseAnonKey =
    runtimeEnv?.PUBLIC_SUPABASE_ANON_KEY ||
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY ||
    import.meta.env.SUPABASE_ANON_KEY;

  // Invalidate cache if a different URL is now available (e.g. runtime env appeared).
  if (cachedClient !== undefined && cachedUrl === supabaseUrl) {
    return cachedClient;
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    cachedClient = null;
    cachedUrl = undefined;
    return cachedClient;
  }

  cachedClient = createClient<Database>(supabaseUrl, supabaseAnonKey);
  cachedUrl = supabaseUrl;
  return cachedClient;
}
