import { getToday, handleError } from "../utils/helpers";
import supabase from "./supabaseClient";
import { SupabaseResponseItem, Tables } from "./supabaseTypes";

export async function getBooking(id: number) {
    try {
        const { data, error } = await supabase
            .from("bookings")
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

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date: string) {
    try {
        const { data, error } = await supabase
            .from("bookings")
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
            .from("bookings")
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
            .from("bookings")
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

export async function updateBooking(id: number, obj: Tables<"bookings">) {
    try {
        const { data, error }: SupabaseResponseItem<"bookings"> = await supabase
            .from("bookings")
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
            .from("bookings")
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
