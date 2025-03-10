import { ReactNode, useState } from "react";
import {
    GlobalSpinnerContext,
    useGlobalSpinnerContext,
} from "./GlobalSpinnerContext";
import styled from "styled-components";
import Spinner from "../Spinner";

const StyledModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-lg);
    padding: 2rem 8rem;
    transition: all 0.5s;
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--backdrop-color);
    backdrop-filter: blur(4px);
    z-index: 1000;
    transition: all 0.5s;
`;
const GlobalSpinner = ({ children }: { children: ReactNode }) => {
    const [globalSpinnerVisible, setGlobalSpinnerVisible] = useState(false);

    const showGlobalSpinner = () => setGlobalSpinnerVisible(true);
    const hideGlobalSpinner = () => setGlobalSpinnerVisible(false);

    return (
        <GlobalSpinnerContext.Provider
            value={{
                showGlobalSpinner,
                hideGlobalSpinner,
                globalSpinnerVisible,
            }}
        >
            {children}
        </GlobalSpinnerContext.Provider>
    );
};

GlobalSpinner.Window = function GlobalSpinnerWindow() {
    const { globalSpinnerVisible } = useGlobalSpinnerContext();
    return globalSpinnerVisible ? (
        <Overlay>
            <StyledModal>
                <Spinner />
            </StyledModal>
        </Overlay>
    ) : null;
};

export default GlobalSpinner;
