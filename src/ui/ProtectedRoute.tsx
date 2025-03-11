import { ReactNode, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { useCurrentUser } from "@/features/authentication/useCurrentUser";
import { useConditionalNavigate } from "@/hooks/useConditionalNavigate";
import { useGlobalSpinner } from "./globalSpinner/useGlobalSpinner";
import { useSafeGlobalUserContext } from "./globalUser/useSafeGlobalUserContext";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const userFromLoader = useLoaderData();
    const { user: userFromContext, setUser } = useSafeGlobalUserContext();
    const { getUser, isLoading, isAuthenticated } = useCurrentUser();

    useGlobalSpinner(isLoading);
    // if there's no user in the user context and in the reactQuery cache the
    // user will be redirected to the login page
    useConditionalNavigate(
        !isLoading && !userFromLoader && !isAuthenticated,
        "/login"
    );

    useEffect(() => {
        if (!userFromContext && userFromLoader) {
            setUser(userFromLoader);
        }
    }, [userFromContext, userFromLoader, setUser]);

    useEffect(() => {
        getUser();
    }, [getUser]);

    return userFromContext || isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
