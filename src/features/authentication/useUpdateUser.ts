import { updateUserById } from "@/services/apiAuth";
import { AppEntities } from "@/types/enums";
import { UpdateUser } from "@/types/types";
import { useSafeGlobalUserContext } from "@/ui/globalUser/useSafeGlobalUserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    const { user: currentUser } = useSafeGlobalUserContext();

    if (!currentUser) {
        throw new Error("Failed to get user from context");
    }

    const { mutate: updateUser, isPending: isUpdating } = useMutation({
        mutationKey: [AppEntities.AppUsers],
        mutationFn: async ({
            userId,
            userUpdate,
        }: {
            userId: string;
            userUpdate: UpdateUser;
        }) => updateUserById(userId, userUpdate, currentUser),
        onSuccess: (user) => {
            queryClient.invalidateQueries({
                queryKey: [AppEntities.AppUsers],
            });
            toast.success(
                `User ${user?.user_metadata.fullName} successfully updated`
            );
        },
        onError: (error) => {
            toast.error(`Failed to update a user: ${error.message}`);
        },
    });

    return { updateUser, isUpdating };
};
