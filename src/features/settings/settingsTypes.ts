import { Tables } from "@/services/supabaseTypes";

export type Setting = { setting: DifAppSettings };
export type DbSettings = Tables<"settings">;
export type AppSettings = Omit<DbSettings, "id" | "created_at">;
export type DifAppSettings = { [K in keyof AppSettings]?: AppSettings[K] };
