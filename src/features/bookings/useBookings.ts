import { getNumBookings } from "@/services/apiBookings";
import { AppTables } from "@/types/enums";
import { useQuery } from "@tanstack/react-query";

export const useNumBookings = () => {
    const {
        data: numBookings,
        isLoading,
        error,
    } = useQuery({
        queryKey: [AppTables.Bookings],
        queryFn: () => getNumBookings(),
    });

    if (error) {
        throw new Error(
            error?.message || "Failed to fetch bookings from supabase"
        );
    }

    return { numBookings, isLoading };
};
