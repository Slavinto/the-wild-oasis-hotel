import { createContext, useContext } from "react";

interface IGlobalSpinnerContext {
    showGlobalSpinner: boolean;
    toggleGlobalSpinner?: () => void;
}

export const GlobalSpinnerContext = createContext<IGlobalSpinnerContext>({
    showGlobalSpinner: false,
});

export const useGlobalSpinnerContext = () => useContext(GlobalSpinnerContext);
