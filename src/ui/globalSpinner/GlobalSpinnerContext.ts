import { createContext, useContext } from "react";

interface IGlobalSpinnerContext {
    globalSpinnerVisible: boolean;
    showGlobalSpinner?: () => void;
    hideGlobalSpinner?: () => void;
}

export const GlobalSpinnerContext = createContext<IGlobalSpinnerContext>({
    globalSpinnerVisible: false,
});

export const useGlobalSpinnerContext = () => useContext(GlobalSpinnerContext);
