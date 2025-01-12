import { handleError } from "@/utils/helpers";
import supabase from "./supabaseClient";

export const getCabins = async () => {
    try {
        const { data: cabins, error } = await supabase
            .from("cabins")
            .select("*");
        if (!cabins || error) {
            throw error;
        }
        return cabins;
    } catch (error) {
        throw handleError(error);
    }
};

export const removeCabin = async (id: number) => {
    try {
        const { data, error } = await supabase
            .from("cabins")
            .delete()
            .eq("id", id)
            .select();
        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        throw handleError(error);
    }
};
