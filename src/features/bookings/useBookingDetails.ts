import { getBooking } from "@/services/apiBookings";
import { AppTables } from "@/types/enums";
import { AppBookingFull } from "@/types/interfaces";
import { createFullAppBookingFromSupabaseFullBooking } from "@/utils/helpers";
import { useQuery } from "@tanstack/react-query";

export const useBookingDetails = (
    id: number
): { bookingDetails: AppBookingFull | null; isLoading: boolean } => {
    const { data, isLoading, error } = useQuery({
        queryKey: [AppTables.Bookings, id],
        queryFn: () => getBooking(id),
    });

    if (error) {
        throw error;
    }

    return {
        bookingDetails: data
            ? createFullAppBookingFromSupabaseFullBooking(data)
            : null,
        isLoading,
    };
};
