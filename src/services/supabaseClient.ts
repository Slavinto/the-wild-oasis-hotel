import { createClient } from "@supabase/supabase-js";
import { Database } from "./supabaseTypes";

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabasePublicKey = import.meta.env.VITE_SUPABASE_PUBLIC_KEY;
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY;

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(supabaseUrl, supabasePublicKey);

export function getAdminClient() {
    const adminClient = createClient<Database>(
        supabaseUrl,
        supabaseServiceKey,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        }
    ).auth.admin;

    return adminClient;
}
