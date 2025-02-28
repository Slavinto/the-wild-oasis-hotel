import { createContext, useContext } from "react";
import { bookingsPerPage } from "@/types/constants";

interface IBookingsContext {
    startDate: Date | null;
    setStart?: (date: Date | null) => void;
    endDate: Date | null;
    setEnd?: (date: Date | null) => void;
    // all selected bookings in supabase number for pagination
    totalBookings: number;
}

export const BookingsContext = createContext<IBookingsContext>({
    startDate: null,
    endDate: null,
    totalBookings: 0,
});
export const useBookingsContext = () => useContext(BookingsContext);
