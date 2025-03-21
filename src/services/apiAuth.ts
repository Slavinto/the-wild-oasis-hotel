import {
    checkIsAllowedToUser,
    checkUserActive,
    getUserStatus,
    handleError,
    uploadImageToBucket,
} from "@/utils/helpers";
import { getAdminClient, supabase } from "./supabaseClient";
import { SignupUser, UpdateUser } from "@/types/types";
import { bucketNames } from "@/types/constants";
import { UserActions, UserStatus } from "@/types/enums";
import { User } from "@supabase/supabase-js";
import { UserSimplified } from "@/types/interfaces";

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

        // throw new Error("test error");
        if (error) {
            throw error;
        }

        return data;
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

        if (!user || getUserStatus(user) === UserStatus.Suspended) {
            return null;
        }

        return user;
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
    userRole,
    signedUpBy,
}: SignupUser) => {
    try {
        const { allowed, message } = checkIsAllowedToUser({
            initiatorUser: signedUpBy,
            targetUser: {
                email,
                user_metadata: {
                    password,
                    fullName,
                    avatar,
                    userRole,
                    userStatus: UserStatus.Active,
                    signedUpBy,
                },
            } as UserSimplified,
            action: UserActions.SignUp,
        });
        if (!allowed) {
            throw new Error(message);
        }

        let avatarUrl = "";
        // 1. upload avatar to the avatars bucket
        if (avatar.length > 0) {
            ({ publicUrl: avatarUrl } = await uploadImageToBucket(
                avatar[0],
                bucketNames.avatars
            ));
            // console.log({ avatarUrl });
        }

        const updateObject = {
            email,
            password,
            options: {
                data: {
                    avatar: avatarUrl,
                    fullName,
                    userRole,
                    userStatus: UserStatus.Active,
                    // signedUpBy is checked in checkIsAllowedToUser helper
                    signedUpBy: signedUpBy!.email,
                },
            },
        };
        // console.log({ updateObject });
        const { data, error } = await supabase.auth.signUp(updateObject);
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

// available only to active users
// get all users function
export const listUsers = async (currentUser: User | null) => {
    try {
        // checkUserNotActiveOrNotAdvanced(currentUser);
        console.log({ currentUser });
        const { allowed, message } = checkIsAllowedToUser({
            initiatorUser: currentUser,
            // targetUser: user,
            action: UserActions.GetAll,
        });
        if (!allowed) {
            throw new Error(message);
        }

        const adminClient = getAdminClient();
        if (!adminClient) {
            throw new Error("Admin client not initialized");
        }
        const { data, error } = await adminClient.listUsers();
        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        console.error({ error });
        throw handleError(error);
    }
};

// user needs to be advanced and active
export const deleteUser = async (id: string, currentUser: User | null) => {
    try {
        const adminClient = getAdminClient();

        // 1. fetching user object from supabase
        const {
            data: { user },
            error: fetchError,
        } = await adminClient.getUserById(id);

        if (!user) {
            throw new Error("Failed to fetch user");
        }

        const { allowed, message } = checkIsAllowedToUser({
            initiatorUser: currentUser,
            targetUser: user,
            action: UserActions.Delete,
        });
        if (!allowed) {
            throw new Error(message);
        }

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
        if (fullFilePath === "") {
            return;
        }
        console.log({ fullFilePath });
        const baseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
        const bucketPath = "/storage/v1/object/public/avatars/";

        const fileName = fullFilePath.replace(`${baseUrl}${bucketPath}`, "");
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

export const updateUserById = async (
    userId: string,
    userUpdate: UpdateUser,
    currentUser: User
) => {
    try {
        // handling user password change attempt
        // checking old password
        if (
            currentUser.email &&
            userUpdate.oldPassword &&
            userUpdate.newPassword
        ) {
            const data = await loginWithEmailPassword({
                email: currentUser.email,
                password: userUpdate.oldPassword,
            });
            console.log({ data });
            if (!data || !data.user || data.user.email !== currentUser.email) {
                throw new Error(
                    "Failed to change user password. Wrong old password"
                );
            }

            const { error } = await supabase.auth.updateUser({
                password: userUpdate.newPassword,
            });

            if (error) {
                throw error;
            }
        }

        const adminClient = getAdminClient();
        const { user: userToUpdate } = await getUserById(userId, currentUser);
        console.log({ userUpdate });

        const { allowed, message } = checkIsAllowedToUser({
            initiatorUser: currentUser,
            targetUser: userToUpdate,
            action: UserActions.Update,
        });
        if (!allowed) {
            throw new Error(message);
        }

        const { email, avatar, ...userMetadata } = userUpdate;
        let publicUrl = "";
        const avatarNotEmpty = avatar instanceof FileList && avatar.length > 0;

        // if we have userUpdate.avatar we need to delete previous avatar image
        if (avatarNotEmpty) {
            // removing old avatar
            if (userToUpdate.user_metadata.avatar) {
                await deleteUserAvatar(
                    JSON.stringify(userToUpdate.user_metadata.avatar)
                );
            }

            // uploading new avatar
            const { publicUrl: avatarUrl } = await uploadImageToBucket(
                avatar[0],
                bucketNames.avatars
            );

            publicUrl = avatarUrl;
            // console.log({ avatarUrl });
        }

        const updateObject = {
            email,
            user_metadata: {
                ...userMetadata,
                lastUpdateBy: currentUser.email,
                ...(avatarNotEmpty ? { avatar: publicUrl } : {}),
            },
        };
        console.log({ updateObjectApi: updateObject });
        const {
            data: { user },
            error,
        } = await adminClient.updateUserById(userId, updateObject);

        if (error) {
            console.error(error.message);
            throw error;
        }

        return user;
    } catch (error) {
        throw handleError(error);
    }
};

export const getUserById = async (userId: string, initiator: User | null) => {
    try {
        checkUserActive(initiator);

        const adminClient = getAdminClient();

        const { data, error } = await adminClient.getUserById(userId);

        if (error) {
            console.error(error.message);
            throw error;
        }

        return data;
    } catch (error) {
        throw handleError(error);
    }
};
