import { useConditionalNavigate } from "@/hooks/useConditionalNavigate";
import { getCurrentUser } from "@/services/apiAuth";
import { AppEntities } from "@/types/enums";
import { useSafeGlobalUserContext } from "@/ui/globalUser/useSafeGlobalUserContext";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useCurrentUser = () => {
    const { setUser } = useSafeGlobalUserContext();

    const {
        data: user,
        isLoading,
        error,
        refetch: getUser,
    } = useQuery({
        queryKey: [AppEntities.User],
        queryFn: getCurrentUser,
        staleTime: 1000 * 60 * 5,
    });

    useConditionalNavigate(!!error?.message, "/login");

    useEffect(() => {
        if (user) {
            setUser(user);
        }
    }, [user, setUser]);

    return {
        user,
        getUser,
        isLoading,
        isAuthenticated: user?.role === "authenticated",
    };
};
