import { useEffect } from "react";
import { useGlobalSpinnerContext } from "./GlobalSpinnerContext";

export const useGlobalSpinner = (toggler: boolean) => {
    const { showGlobalSpinner, hideGlobalSpinner } = useGlobalSpinnerContext();

    useEffect(() => {
        if (toggler) {
            showGlobalSpinner?.();
        } else {
            hideGlobalSpinner?.();
        }
    }, [toggler, showGlobalSpinner, hideGlobalSpinner]);
};
