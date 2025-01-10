import { handleError } from "@/utils/helpers";
import supabase from "./supabaseClient";
import { Tables, Database } from "./supabaseTypes";
import { PostgrestError } from "@supabase/supabase-js";

export const getCabins = async () => {
    try {
        const { data: cabins, error } = await supabase.from("cabins").select();
        if (!cabins || error) {
            throw new Error(error?.message);
        }
        return cabins;
    } catch (error) {
        throw handleError(error);
    }
};
