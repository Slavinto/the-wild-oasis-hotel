import { AppTables } from "@/types/enums";
import {
    createSupabaseFullBookingFromFullAppBooking,
    getToday,
    handleError,
} from "../utils/helpers";
import { supabase } from "./supabaseClient";
import { PaginatedBookings } from "@/types/interfaces";
import {
    AppBookingUpdate,
    BookingsInterval,
    BookingSortBy,
    BookingsWithRelatedFull,
} from "@/types/types";

// get number of bookings
export async function getNumBookings(): Promise<number> {
    try {
        const query = supabase
            .from(AppTables.Bookings)
            .select(undefined, { count: "exact" });

        const { count, error } = await query;

        if (error) {
            throw new Error(
                error.message || "Failed to get bookings data from database"
            );
        }

        return count ?? 0;
    } catch (error) {
        throw handleError(error);
    }
}

// gets bookings with particular status and interval; also used in pagination
// accepts status filters and datepicker intervals -> returns bookings for date interval
// supports paginated output through query.range method and pageIndex param
export async function getBookingsWithStatusAndInterval(
    status = "all",
    interval: BookingsInterval,
    pageIndex: { fromIndex: number; toIndex: number },
    sort: { sortBy: BookingSortBy; sortOrder: "asc" | "desc" }
): Promise<PaginatedBookings> {
    try {
        let query = supabase
            .from(AppTables.Bookings)
            .select(
                `*, ${AppTables.Guests}:guest_id(full_name, email), ${AppTables.Cabins}:cabin_id(name)`,
                { count: "exact" }
            );
        if (status !== "all") {
            query = query.eq("status", status);
        }

        if (interval) {
            const startDate = interval[0];
            const endDate = interval[1];

            if (endDate) {
                query = query
                    .or(
                        `start_date.gte.'${startDate}', end_date.gte.'${startDate}'`
                    )
                    .or(
                        `start_date.lte.'${endDate}', end_date.lte.'${endDate}'`
                    );
            }

            // console.log({ startDate, endDate });
        }

        // we apply sorting before using range pagination functionality
        if (sort.sortBy && sort.sortOrder) {
            query = query.order(sort.sortBy, {
                ascending: sort.sortOrder === "asc",
            });
        }

        query = query.range(pageIndex.fromIndex, pageIndex.toIndex);
        const { data, count, error } = await query;

        if (!data || error) {
            throw new Error(
                error.message || "Failed to get bookings data from database"
            );
        }

        return {
            bookings: data,
            totalBookings: count || 0,
        } as PaginatedBookings;
    } catch (error) {
        throw handleError(error);
    }
}

export async function getBooking(id: number): Promise<BookingsWithRelatedFull> {
    try {
        const { data, error } = await supabase
            .from(AppTables.Bookings)
            .select(
                `*, ${AppTables.Guests}:guest_id(full_name, email, nationality, country_flag, national_id), ${AppTables.Cabins}:cabin_id(name)`,
                { count: "exact" }
            )
            .eq("id", id)
            .single();

        if (error) {
            console.error(error);
            throw error;
        }

        return data;
    } catch (error) {
        throw handleError(error);
    }
}

// Returns all BOOKINGS that were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date: string) {
    try {
        const { data, error } = await supabase
            .from(AppTables.Bookings)
            .select("created_at, total_price, extras_price")
            .gte("created_at", date)
            .lte("created_at", getToday({ end: true }));

        if (error) {
            console.error(error);
            throw error;
        }

        return data;
    } catch (error) {
        throw handleError(error);
    }
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string) {
    try {
        const { data, error } = await supabase
            .from(AppTables.Bookings)
            .select("*, guests(full_name)")
            .gte("start_date", date)
            .lte("start_date", getToday());

        if (error) {
            console.error(error);
            throw error;
        }

        return data;
    } catch (error) {
        throw handleError(error);
    }
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
    const today = getToday().split("T")[0];
    try {
        const { data, error } = await supabase
            .from(AppTables.Bookings)
            .select("*, guests(full_name, nationality, country_flag)")
            .or(`start_date.eq.${today},end_date.eq.${today}`)
            .order("created_at");

        // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
        // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
        // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

        if (error) {
            console.error(error);
            throw error;
        }
        return data;
    } catch (error) {
        throw handleError(error);
    }
}

export async function updateBooking(id: number, obj: AppBookingUpdate) {
    const supabaseObject = createSupabaseFullBookingFromFullAppBooking(obj);

    try {
        const { data, error } = await supabase
            .from(AppTables.Bookings)
            .update(supabaseObject)
            .eq("id", id)
            .select()
            .single();

        if (error) {
            console.error(error);
            throw error;
        }
        return data;
    } catch (error) {
        throw handleError(error);
    }
}

export async function deleteBooking(id: number) {
    try {
        // REMEMBER RLS POLICIES
        const { data, error } = await supabase
            .from(AppTables.Bookings)
            .delete()
            .eq("id", id);

        if (error) {
            console.error(error);
            throw error;
        }
        return data;
    } catch (error) {
        throw handleError(error);
    }
}
