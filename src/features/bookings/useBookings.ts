import { getBookings } from "@/services/apiBookings";
import { AppTables } from "@/types/enums";
import { BookingStatus } from "@/types/interfaces";
import { useQuery } from "@tanstack/react-query";

export const useBookings = (status: BookingStatus) => {
    const {
        data: bookings,
        isLoading,
        error,
    } = useQuery({
        queryKey: [AppTables.Bookings, status],
        queryFn: () => getBookings(status),
    });

    if (error) {
        throw new Error(
            error?.message || "Failed to fetch bookings from supabase"
        );
    }

    return { bookings, isLoading };
};
