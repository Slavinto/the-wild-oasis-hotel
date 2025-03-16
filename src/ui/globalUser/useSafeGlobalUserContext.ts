import {
    GLOBAL_CONTEXT_ERROR_MESSAGE,
    useGlobalUserContext,
} from "./GlobalUserContext";

export const useSafeGlobalUserContext = () => {
    const context = useGlobalUserContext();
    if (!context) {
        throw new Error(GLOBAL_CONTEXT_ERROR_MESSAGE);
    }

    return { ...context };
};
