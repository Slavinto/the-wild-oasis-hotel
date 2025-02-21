import { createContext, useContext } from "react";

interface ITestModal {
    isOpen: boolean;
    toggleModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TestModalContext = createContext<ITestModal>({ isOpen: false });

export const useTestModalContext = () => useContext(TestModalContext);
