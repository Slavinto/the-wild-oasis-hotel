import { createContext, useContext } from "react";

interface IBookingsContext {
    startDate: Date | null;
    setStart?: (date: Date | null) => void;
    endDate: Date | null;
    setEnd?: (date: Date | null) => void;
}

export const BookingsContext = createContext<IBookingsContext>({
    startDate: null,
    endDate: null,
});
export const useBookingsContext = () => useContext(BookingsContext);
