import { handleError, uploadImageToBucket } from "@/utils/helpers";
import { getAdminClient, supabase } from "./supabaseClient";
import { SignupUser } from "@/types/types";
import { bucketNames } from "@/types/constants";

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
    avatar,
}: SignupUser) => {
    try {
        let avatarUrl = "";
        // 1. upload avatar to the avatars bucket
        if (avatar) {
            ({ publicUrl: avatarUrl } = await uploadImageToBucket(
                avatar,
                bucketNames.avatars
            ));
            // console.log({ avatarUrl });
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    fullName,
                    avatar: avatarUrl,
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
        console.log({ data });
        console.log({ error });
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
            throw error;
        }
        return users;
    } catch (error) {
        console.error({ error });
        throw handleError(error);
    }
};

export const deleteUser = async (id: string) => {
    try {
        const adminClient = getAdminClient();

        // 1. fetching user object from supabase
        const {
            data: { user },
            error: fetchError,
        } = await adminClient.getUserById(id);

        // 2. deleting user from supabase
        const {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            data,
            error: deleteError,
        } = await adminClient.deleteUser(id);

        // 3. deleting avatar image from the bucket
        await deleteUserAvatar(user?.user_metadata.avatar);

        if (deleteError || fetchError) {
            if (deleteError) {
                console.error(deleteError.message);
                throw handleError(deleteError);
            }
            if (fetchError) {
                console.error(fetchError.message);
                throw handleError(fetchError);
            }
        }

        // delete user avatar image from bucket

        return user;
    } catch (error) {
        console.error({ error });
        throw handleError(error);
    }
};

const deleteUserAvatar = async (fullFilePath: string) => {
    try {
        const baseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
        const bucketPath = "/storage/v1/object/public/avatars/";

        const fileName = fullFilePath.replace(`${baseUrl}${bucketPath}`, "");
        console.log({ fullFilePath });
        const bucketName = bucketNames.avatars;

        if (!fullFilePath || !fileName) {
            throw new Error("Invalid image path. Failed to delete cabin image");
        }
        const { error } = await supabase.storage
            .from(bucketName)
            .remove([fileName]);
        if (error) {
            console.error(error.message);
            throw error;
        }
    } catch (error) {
        throw handleError(error);
    }
};
