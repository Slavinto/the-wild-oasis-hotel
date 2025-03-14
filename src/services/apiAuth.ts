import { handleError } from "@/utils/helpers";
import { getAdminClient, supabase } from "./supabaseClient";
import { SignupUser } from "@/types/types";

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
            error,
        } = await supabase.auth.getUser();
        if (error) {
            return null;
        }
        return user ?? null;
    } catch (error) {
        console.error(handleError(error).message);
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

export const signupUserEmailPassword = async ({
    email,
    password,
    fullName,
    avatar = "",
}: SignupUser) => {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    fullName,
                    avatar,
                },
            },
        });
        if (error) {
            throw error;
        }

        // explicitly logging user out after sign up
        if (data.user) {
            await supabase.auth.signOut();
        }
        return data;
    } catch (error) {
        const newError = handleError(error);
        console.error(newError);
        throw newError;
    }
};

export const listUsers = async () => {
    try {
        const adminClient = getAdminClient();
        if (!adminClient) {
            throw new Error("Admin client not initialized");
        }
        const {
            data: { users },
            error,
        } = await adminClient.listUsers();

        if (error) {
            console.error(error);
            throw error;
        }

        return users;
    } catch (error) {
        throw handleError(error);
    }
};
