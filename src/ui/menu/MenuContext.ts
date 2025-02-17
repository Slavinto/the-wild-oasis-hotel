import { createContext, Dispatch, SetStateAction, useContext } from "react";

export interface MenuPosition {
    $position: { x: number; y: number };
}

interface IMenuContext {
    openId: number | null;
    openMenu?: () => void;
    closeMenu?: () => void;
    position?: MenuPosition;
    setPosition?: Dispatch<SetStateAction<MenuPosition | undefined>>;
}

export const MenuContext = createContext<IMenuContext>({
    openId: null,
});

export const useMenuContext = () => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error("Menu components must be wrapped with <Menu>");
    }
    return context;
};
