import { createClient } from "@supabase/supabase-js";
import { Database } from "./supabaseTypes";

// Create a single supabase client for interacting with your database
const supabase = createClient<Database>(
    import.meta.env.VITE_SUPABASE_PROJECT_URL,
    import.meta.env.VITE_SUPABASE_PUBLIC_KEY
);

export default supabase;
