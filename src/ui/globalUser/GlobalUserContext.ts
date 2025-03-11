import { AppUserContext } from "@/types/interfaces";
import { createContext, useContext } from "react";

export const GLOBAL_CONTEXT_ERROR_MESSAGE =
    "Global user context used outside of the context";

export const GlobalUserContext = createContext<AppUserContext | null>(null);

export const useGlobalUserContext = () => useContext(GlobalUserContext);
