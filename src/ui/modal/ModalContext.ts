import { ModalWindows } from "@/types/enums";
import { createContext, Dispatch, SetStateAction } from "react";

// modal interface
interface IModal {
    open: Dispatch<SetStateAction<ModalWindows | null>>;
    close: () => void;
    openWindowName: ModalWindows | null;
}

// modal context
export const ModalContext = createContext<IModal>({} as IModal);
