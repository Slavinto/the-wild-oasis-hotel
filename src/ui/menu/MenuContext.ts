import { createContext, Dispatch, SetStateAction } from "react";

export interface MenuPosition {
    $position: { x: number; y: number };
}

interface IMenuContext {
    openId: number | string | null;
    openMenu?: () => void;
    closeMenu?: () => void;
    position?: MenuPosition;
    setPosition?: Dispatch<SetStateAction<MenuPosition | undefined>>;
}

export const MenuContext = createContext<IMenuContext>({
    openId: null,
});
