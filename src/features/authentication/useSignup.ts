import { signupUserEmailPassword } from "@/services/apiAuth";
import { AppEntities } from "@/types/enums";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useSignup = () => {
    const {
        mutate: signup,
        error,
        isPending: isLoading,
    } = useMutation({
        mutationKey: [AppEntities.User],
        mutationFn: signupUserEmailPassword,
        onSuccess: ({ user }) => {
            if (!user) {
                throw new Error("Failed to create user.");
            }
            toast.success(`User ${user.email} successfully created`);
        },
        onError: (error) => {
            toast.error(`Failed to create user: ${error.message}`);
        },
    });

    if (error) {
        throw error;
    }

    return { signup, isLoading };
};
