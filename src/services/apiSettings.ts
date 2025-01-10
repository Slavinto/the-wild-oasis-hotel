import { handleError } from "@/utils/helpers";
import supabase from "./supabaseClient";
import { Tables } from "./supabaseTypes";
import { PostgrestError } from "@supabase/supabase-js";

export interface SupabaseSettingsTable {
    data: Tables<"settings"> | null;
    error: PostgrestError | null;
}

export async function getSettings() {
    try {
        const { data, error }: SupabaseSettingsTable = await supabase
            .from("settings")
            .select("*")
            .single();

        if (error) {
            console.error(error);
            throw error;
        }
        return data;
    } catch (error) {
        throw handleError(error);
    }
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting: {
    setting: Tables<"settings">;
}) {
    const { data, error }: SupabaseSettingsTable = await supabase
        .from("settings")
        .update(newSetting.setting)
        // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
        .eq("id", 1)
        .single();

    if (error) {
        console.error(error);
        throw new Error("Settings could not be updated");
    }
    return data;
}
