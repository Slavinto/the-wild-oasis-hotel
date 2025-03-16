import { AppEntities } from "@/types/enums";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser as deleteUserApi } from "@/services/apiAuth";
import toast from "react-hot-toast";
import { User } from "@supabase/supabase-js";

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    const { mutate: deleteUser, isPending: isDeleting } = useMutation<
        User | null,
        Error,
        string,
        unknown
    >({
        mutationKey: [AppEntities.AppUsers],
        mutationFn: (id) => deleteUserApi(id),

        onSuccess: (user) => {
            queryClient.invalidateQueries({ queryKey: [AppEntities.AppUsers] });
            toast.success(
                `User ${user?.user_metadata.fullName} successfully deleted`
            );
        },
        onError: (error) => {
            toast.error(`Failed to delete user: ${error.message}`);
            console.error(error.message);
        },
    });

    return { deleteUser, isDeleting };
};
