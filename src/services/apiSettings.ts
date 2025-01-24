import { handleError } from "@/utils/helpers";
import supabase from "./supabaseClient";
import { Tables } from "./supabaseTypes";

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
        return data;
    } catch (error) {
        throw handleError(error);
    }
}

type NewSettingType = Omit<Tables<"settings">, "id" | "created_at">;
type SettingsProp<K extends keyof NewSettingType> = Record<K, NewSettingType>;
// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting: {
    setting: SettingsProp<keyof NewSettingType>;
}) {
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
