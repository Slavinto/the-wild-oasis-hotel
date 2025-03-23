import { getStaysAfterDate } from "@/services/apiBookings";
import { AppTables } from "@/types/enums";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const useRecentStays = () => {
    const [searchParams] = useSearchParams();
    const dayMs = 24 * 60 * 60 * 1000;
    const filter = useMemo(
        () => Number(searchParams.get("filter")?.split("-")[1]) || 7,
        [searchParams]
    );
    const dateMs = Date.now() - dayMs * filter;
    const date = new Date(dateMs).toISOString();

    const {
        data: stays,
        error,
        isLoading,
    } = useQuery({
        queryKey: [AppTables.Bookings, filter],
        queryFn: () => getStaysAfterDate(date),
        staleTime: 60 * 1000,
    });

    if (error) {
        throw error;
    }

    return { stays, isLoading };
};
