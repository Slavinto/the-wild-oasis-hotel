import { getBookingsWithStatusAndInterval } from "@/services/apiBookings";
import { AppTables } from "@/types/enums";
import { useQuery } from "@tanstack/react-query";
import { BookingsInterval } from "@/types/types";
import { formatDateUtc } from "@/utils/helpers";
import { useSortBookingsClient } from "./useSortBookingsClient";
import { useSearchParams } from "react-router-dom";

// this returns sorted bookings for certain interval
export const useBookingsInterval = (
    dates: [Date | null, Date | null | undefined]
) => {
    const interval = [
        formatDateUtc(dates[0]),
        formatDateUtc(dates[1] ?? null),
    ] as BookingsInterval;
    console.log({ interval });

    // booking status comes from searchParams
    const [searchParams] = useSearchParams();
    const status = searchParams.get("filter") || "all";

    const {
        data: bookingsInterval,
        isLoading,
        error,
    } = useQuery({
        queryKey: [AppTables.Bookings, interval, status],
        queryFn: () => getBookingsWithStatusAndInterval(status, interval),
    });

    console.log({ bookingsInterval });

    const { sortedBookings } = useSortBookingsClient(bookingsInterval);

    if (error) {
        throw new Error(
            error?.message || "Failed to fetch bookings from supabase"
        );
    }

    return { sortedBookings, isLoading };
};
