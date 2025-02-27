import { Tables } from "@/services/supabaseTypes";
import { AppTables } from "./enums";

// we're getting additional data from related tables "guests" and "cabins"
export type BookingsWithRelated = Tables<AppTables.Bookings> & {
    guests: { full_name: string | null; email: string | null };
    cabins: { name: string | null };
};

// a type for querying bookings for specific time interval
export type BookingsInterval =
    | [startDate: string, endDate?: string]
    | undefined;
