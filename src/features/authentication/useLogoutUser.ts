import { logoutUser } from "@/services/apiAuth";
import { AppEntities } from "@/types/enums";
import { useSafeGlobalUserContext } from "@/ui/globalUser/useSafeGlobalUserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useLogoutUser = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { setUser } = useSafeGlobalUserContext();

    const { mutate: logout, isPending: isLoading } = useMutation({
        mutationKey: [AppEntities.User],
        mutationFn: logoutUser,

        onSuccess: () => {
            queryClient.removeQueries();
            setUser(null);
            toast.success(`User successfully logged out`);
            navigate("/login", { replace: true });
        },
        onError: (error) => {
            toast.error(`User failed to log out: ${error.message}`);
        },
    });

    return { logout, isLoading };
};
