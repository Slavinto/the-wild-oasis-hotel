import { handleError } from "@/utils/helpers";
import supabase from "./supabaseClient";

export const loginWithEmailPassword = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            throw error;
        }

        return data.user;
    } catch (error) {
        throw handleError(error);
    }
};

export const getCurrentUser = async () => {
    try {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        return user;
    } catch (error) {
        throw handleError(error);
    }
};

export const logoutUser = async () => {
    try {
        const { error } = await supabase.auth.signOut();

        return error;
    } catch (error) {
        throw handleError(error);
    }
};
