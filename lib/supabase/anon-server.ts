import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Anon-key client for use inside route handlers. Subject to the same Row
 * Level Security policies as a browser client — used here so the waitlist
 * insert path is validated server-side while still only ever holding
 * insert-only privileges.
 */
export function createSupabaseAnonServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
