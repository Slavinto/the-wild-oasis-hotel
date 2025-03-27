import { useContext } from "react";
import { MenuContext } from "./MenuContext";

export const useMenuContext = () => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error("Menu components must be wrapped with <Menu>");
    }
    return context;
};
