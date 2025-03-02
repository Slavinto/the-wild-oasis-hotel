import { Tables } from "@/services/supabaseTypes";
import { AppTables } from "./enums";

// we're getting additional data from related tables "guests" and "cabins"
export type BookingsWithRelated = Tables<AppTables.Bookings> & {
    guests: { full_name: string | null; email: string | null };
    cabins: { name: string | null };
};

export type BookingsWithRelatedFull = Tables<AppTables.Bookings> & {
    guests: {
        full_name: string | null;
        email: string | null;
        nationality: string | null;
        country_flag: string | null;
        national_id: string | null;
    } | null;
    cabins: { name: string | null } | null;
};

// a type for querying bookings for specific time interval
export type BookingsInterval =
    | [startDate: string, endDate?: string]
    | undefined;
