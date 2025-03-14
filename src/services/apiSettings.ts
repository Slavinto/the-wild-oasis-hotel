import { handleError } from "@/utils/helpers";
import { supabase } from "./supabaseClient";
import { Setting } from "@/features/settings/settingsTypes";

export async function getSettings() {
    try {
        const { data, error } = await supabase
            .from("settings")
            .select("*")
            .single();

        if (error) {
            console.error(error);
            throw error;
        }
        console.log({ data });
        return data;
    } catch (error) {
        throw handleError(error);
    }
}

export async function updateSetting(newSetting: Setting) {
    const { data, error } = await supabase
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
