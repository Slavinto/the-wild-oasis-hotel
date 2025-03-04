import { ModalWindows } from "@/types/enums";
import { createContext } from "react";

// modal interface
interface IModal {
    open: (windowName: ModalWindows) => void;
    // open: Dispatch<SetStateAction<ModalWindows | null>>;
    close: () => void;
    openWindowName: ModalWindows | null;
}

// modal context
export const ModalContext = createContext<IModal>({} as IModal);
