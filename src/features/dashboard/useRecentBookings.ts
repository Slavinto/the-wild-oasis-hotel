import { getBookingsAfterDate } from "@/services/apiBookings";
import { AppTables } from "@/types/enums";
import { formatDateEu } from "@/utils/helpers";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const useRecentBookings = () => {
    const [searchParams] = useSearchParams();
    const dayMs = 24 * 60 * 60 * 1000;
    const filter = useMemo(
        () => Number(searchParams.get("filter")?.split("-")[1]) || 7,
        [searchParams]
    );
    const dateMs = Date.now() - dayMs * filter;
    const date = new Date(dateMs).toISOString();

    const headerText = `Bookings from ${formatDateEu(
        new Date(dateMs)
    )} till today (last ${filter} days)`;

    // const queryDate = subDays(new Date(), filter).toISOString();

    const {
        data: bookings,
        error,
        isLoading,
    } = useQuery({
        queryKey: [AppTables.Bookings, filter],
        queryFn: () => getBookingsAfterDate(date),
        staleTime: 60 * 1000,
    });

    if (error) {
        throw error;
    }

    return { bookings, headerText, filter, isLoading };
};
