// import { Tables } from "@/services/supabaseTypes";
// import { Cabin } from "@/types/interfaces";
// import { useMutation, UseMutationResult } from "@tanstack/react-query";
// import {
//     createContext,
//     FC,
//     PropsWithChildren,
//     useContext,
//     useState,
// } from "react";
// import { useCreateOrUpdateCabin } from "./useCreateOrUpdateCabin";

// enum CabinFragments {
//     None = "none",
//     CabinRow = "cabinRow",
// }
// interface ICabinContext {}

// const initialCabinContext = {
//     loading: CabinFragments,
// };

// const CabinContext = createContext<ICabinContext>(undefined);

// export const useCabinContext = () => useContext(CabinContext);

// const CabinContextProvider: FC<PropsWithChildren> = ({ children }) => {
//     // const [cabinContextValue, setCabinContextValue] = useState<ICabinContext>();

//     const mutation = useCreateOrUpdateCabin();

//     return <CabinContext.Provider value={}>{children}</CabinContext.Provider>;
// };

// export default CabinContextProvider;
