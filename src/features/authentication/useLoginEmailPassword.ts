import { loginWithEmailPassword } from "@/services/apiAuth";
import { AppEntities } from "@/types/enums";
import { useSafeGlobalUserContext } from "@/ui/globalUser/useSafeGlobalUserContext";
import { User } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useLoginEmailPassword = () => {
    const queryClient = useQueryClient();
    const { setUser } = useSafeGlobalUserContext();

    const {
        mutate: login,
        error,
        isPending: isLoggingIn,
    } = useMutation({
        mutationKey: [AppEntities.User],
        mutationFn: ({
            email,
            password,
        }: {
            email: string;
            password: string;
        }) => loginWithEmailPassword({ email, password }),
        onSuccess: (data) => {
            setUser(data);
            toast.success(`User successfully logged in`);

            // setting user data in the reactQuery cache right away
            queryClient.setQueryData<User | null>(
                [AppEntities.User],
                (oldData: User | null | undefined) =>
                    oldData ? { ...oldData, ...data } : data
            );
        },
        onError: (error) => {
            toast.error(`Failed to log in user: ${error.message}`);
            setUser(null);
        },
    });

    return { login, isLoggingIn, error };
};
