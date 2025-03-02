import { getBookingsWithStatusAndInterval } from "@/services/apiBookings";
import { AppTables } from "@/types/enums";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BookingsInterval } from "@/types/types";
import { formatDateUtc } from "@/utils/helpers";
import { useSortBookingsClient } from "./useSortBookingsClient";
import { useSearchParams } from "react-router-dom";
import { bookingsPerPage } from "@/types/constants";

// this returns sorted bookings for certain interval
export const useBookings = (dates: [Date | null, Date | null | undefined]) => {
    const interval = [
        formatDateUtc(dates[0]),
        formatDateUtc(dates[1] ?? null),
    ] as BookingsInterval;
    const queryClient = useQueryClient();

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

    function prefetchBookingPages(pageIndexPrefetch: {
        fromIndex: number;
        toIndex: number;
    }) {
        queryClient.prefetchQuery({
            queryKey: [AppTables.Bookings, interval, status, pageIndexPrefetch],
            queryFn: () =>
                getBookingsWithStatusAndInterval(
                    status,
                    interval,
                    pageIndexPrefetch
                ),
        });
    }

    const { bookings, totalBookings } = paginatedBookings || {};

    // prefetching page data
    const minPage = 1;
    const maxPage = totalBookings
        ? Math.ceil(totalBookings / bookingsPerPage)
        : 1;

    // prefetching next page
    if (page < maxPage && maxPage > minPage) {
        const nextPageStartIndex = pageIndex.toIndex + 1;
        const pageIndexPrefetch = {
            fromIndex: nextPageStartIndex,
            toIndex: nextPageStartIndex + bookingsPerPage - 1,
        };

        prefetchBookingPages(pageIndexPrefetch);
    }

    // prefetching previous page
    if (page > minPage) {
        const prevPageStartIndex = pageIndex.fromIndex - bookingsPerPage;
        const pageIndexPrefetch = {
            fromIndex: prevPageStartIndex,
            toIndex: pageIndex.fromIndex - 1,
        };

        prefetchBookingPages(pageIndexPrefetch);
    }

    const { sortedBookings } = useSortBookingsClient(bookings || []);

    if (error) {
        throw new Error(
            error?.message || "Failed to fetch bookings from supabase"
        );
    }

    return { sortedBookings, isLoading, totalBookings };
};
