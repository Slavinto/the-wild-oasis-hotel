import { getBookingsWithStatusAndInterval } from "@/services/apiBookings";
import { AppTables } from "@/types/enums";
import { useQuery } from "@tanstack/react-query";
import { BookingsInterval } from "@/types/types";
import { formatDateUtc } from "@/utils/helpers";
import { useSortBookingsClient } from "./useSortBookingsClient";
import { useSearchParams } from "react-router-dom";
import { bookingsPerPage } from "@/types/constants";

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
    const page = Number(searchParams.get("page")) || 1;
    const fromIndex = (page - 1) * bookingsPerPage;
    const toIndex = fromIndex + bookingsPerPage - 1;
    const pageIndex = { fromIndex, toIndex };

    const {
        data: paginatedBookings,
        isLoading,
        error,
    } = useQuery({
        queryKey: [AppTables.Bookings, interval, status, pageIndex],
        queryFn: () =>
            getBookingsWithStatusAndInterval(status, interval, pageIndex),
    });

    console.log({ paginatedBookings });
    const { bookings, totalBookings } = paginatedBookings || {};

    const { sortedBookings } = useSortBookingsClient(bookings || []);

    if (error) {
        throw new Error(
            error?.message || "Failed to fetch bookings from supabase"
        );
    }

    return { sortedBookings, isLoading, totalBookings };
};
