import { createContext, useContext } from "react";

interface CabinsContext {
    currentCabinId?: number;
    onSetCabinId?: (cabinId: number) => void;
}

export const CabinsContext = createContext<CabinsContext>({});
export const useCabinsContext = () => useContext(CabinsContext);
