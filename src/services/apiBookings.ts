import { AppTables } from "@/types/enums";
import { getToday, handleError } from "../utils/helpers";
import supabase from "./supabaseClient";
import { SupabaseResponseItem, Tables } from "./supabaseTypes";
import { BookingsInterval, BookingsWithRelated } from "@/types/types";

// get all bookings
export async function getBookings(
    status = "all"
): Promise<BookingsWithRelated[]> {
    try {
        let query = supabase
            .from(AppTables.Bookings)
            .select(
                `*, ${AppTables.Guests}:guest_id(full_name, email), ${AppTables.Cabins}:cabin_id(name)`
            );

        if (status !== "all") {
            query = query.eq("status", status);
        }

        const { data, error } = await query;

        if (!data || error) {
            throw new Error(
                error.message || "Failed to get bookings data from database"
            );
        }

        return data as BookingsWithRelated[];
    } catch (error) {
        throw handleError(error);
    }
}

// get all bookings
export async function getBookingsWithStatusAndInterval(
    status = "all",
    interval: BookingsInterval
): Promise<BookingsWithRelated[]> {
    try {
        let query = supabase
            .from(AppTables.Bookings)
            .select(
                `*, ${AppTables.Guests}:guest_id(full_name, email), ${AppTables.Cabins}:cabin_id(name)`
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

            console.log({ startDate, endDate });
        }

        const { data, error } = await query;

        if (!data || error) {
            throw new Error(
                error.message || "Failed to get bookings data from database"
            );
        }

        return data as BookingsWithRelated[];
    } catch (error) {
        throw handleError(error);
    }
}

export async function getBooking(id: number) {
    try {
        const { data, error } = await supabase
            .from(AppTables.Bookings)
            .select("*, cabins(*), guests(*)")
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

export async function getBookingsInterval(
    interval: BookingsInterval
): Promise<BookingsWithRelated[] | null> {
    try {
        if (!interval) {
            return null;
        }
        let query = supabase
            .from(AppTables.Bookings)
            .select(
                `*, ${AppTables.Guests}:guest_id(full_name, email), ${AppTables.Cabins}:cabin_id(name)`
            );
        console.log({ interval });
        if (interval[0]) {
            query = query.gte("start_date", interval[0]);
        }

        if (interval[1]) {
            query = query.lte("end_date", interval[1]);
        }

        const { data, error } = await query;

        if (!data || error) {
            throw new Error(
                error.message || "Failed to get bookings data from database"
            );
        }

        return data as BookingsWithRelated[];
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
            // .select('*')
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
    try {
        const { data, error } = await supabase
            .from(AppTables.Bookings)
            .select("*, guests(full_name, nationality, country_flag)")
            .or(
                `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
            )
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

export async function updateBooking(
    id: number,
    obj: Tables<AppTables.Bookings>
) {
    try {
        const { data, error }: SupabaseResponseItem<AppTables.Bookings> =
            await supabase
                .from(AppTables.Bookings)
                .update(obj)
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
