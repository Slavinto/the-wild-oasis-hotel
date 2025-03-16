import { useConditionalNavigate } from "@/hooks/useConditionalNavigate";
import { getCurrentUser } from "@/services/apiAuth";
import { AppEntities } from "@/types/enums";
import { useSafeGlobalUserContext } from "@/ui/globalUser/useSafeGlobalUserContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useCurrentUser = () => {
    const { setUser } = useSafeGlobalUserContext();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {
        data: user,
        isLoading,
        error,
        refetch: getUser,
    } = useQuery({
        queryKey: [AppEntities.User],
        queryFn: getCurrentUser,
        // staleTime: 1000 * 60 * 5,
    });

    useConditionalNavigate(!!error?.message, "/login");

    // purging queries if user not logged in
    useEffect(() => {
        if (user === null) {
            queryClient.removeQueries();
            navigate("/login");
        }
    }, [queryClient, user, navigate]);

    // writing user to app user context
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
