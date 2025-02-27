import { Tables } from "@/services/supabaseTypes";
import { cabinValues } from "@/types/constants";
import {
    AppBooking,
    BookingStatus,
    Cabin,
    SupabaseCabin,
} from "@/types/interfaces";
import { BookingsWithRelated } from "@/types/types";
import { formatDistance, parseISO, differenceInDays, format } from "date-fns";

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1: string, dateStr2: string) =>
    differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr: string) =>
    formatDistance(parseISO(dateStr), new Date(), {
        addSuffix: true,
    })
        .replace("about ", "")
        .replace("in", "In");

export const formatDateUtc = (date: Date | null) => {
    // const jsDate = new Date(date);
    return date ? format(date, "yyyy-MM-dd hh:mm:ss") : "";
};

export const monthBeforeDate = (date?: Date) => {
    const today = !date ? new Date() : date;

    return new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
};

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
interface GetTodayOptions {
    end?: boolean | null;
}
export const getToday = function (options: GetTodayOptions = {}) {
    const today = new Date();

    // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
    if (options?.end)
        // Set to the last second of the day
        today.setUTCHours(23, 59, 59, 999);
    else today.setUTCHours(0, 0, 0, 0);
    return today.toISOString();
};

export const formatCurrency = (value: number | bigint) =>
    new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
        value
    );

export const handleError = (incError: unknown): Error => {
    if (incError instanceof Error) {
        return incError;
    } else if (
        incError &&
        typeof incError === "object" &&
        "message" in incError
    ) {
        return new Error(JSON.stringify(incError.message));
    } else {
        return new Error(JSON.stringify(incError));
    }
};

type SupabaseCabinFromCabin = {
    (cabin: Cabin): SupabaseCabin;
};
export const createSupabaseCabinFromCabin: SupabaseCabinFromCabin = (cabin) => {
    const { name, maxCapacity, regularPrice, discount, description, imageUrl } =
        cabin;
    return {
        id: Date.now(),
        name,
        max_capacity: maxCapacity,
        regular_price: regularPrice,
        discount,
        description,
        image_url: imageUrl,
    };
};

export const checkIsTableCabin = (
    value: unknown
): value is Tables<"cabins"> => {
    return (
        typeof value === "object" &&
        value !== null &&
        typeof (value as Tables<"cabins">).created_at === "string" &&
        "description" in value &&
        ((value as Tables<"cabins">).description === null ||
            typeof (value as Tables<"cabins">).description === "string") &&
        "discount" in value &&
        ((value as Tables<"cabins">).discount === null ||
            typeof (value as Tables<"cabins">).discount === "number") &&
        typeof (value as Tables<"cabins">).id === "number" &&
        "image_url" in value &&
        ((value as Tables<"cabins">).image_url === null ||
            typeof (value as Tables<"cabins">).image_url === "string") &&
        "max_capacity" in value &&
        ((value as Tables<"cabins">).max_capacity === null ||
            typeof (value as Tables<"cabins">).max_capacity === "number") &&
        "name" in value &&
        ((value as Tables<"cabins">).name === null ||
            typeof (value as Tables<"cabins">).name === "string") &&
        "regular_price" in value &&
        ((value as Tables<"cabins">).regular_price === null ||
            typeof (value as Tables<"cabins">).regular_price === "number")
    );
};

type CabinFromSupabaseTableCabin = {
    (cabin: Tables<"cabins">): Cabin;
};
export const createCabinFromSupabaseTableCabin: CabinFromSupabaseTableCabin = (
    cabin
) => {
    return {
        description: cabin?.description || "",
        discount: cabin?.discount || cabinValues.MininmumDiscount,
        imageUrl: cabin?.image_url || "",
        maxCapacity: cabin?.max_capacity || cabinValues.MaximumCapacity,
        name: cabin?.name || "",
        regularPrice: cabin?.regular_price || cabinValues.MinimumPrice,
        image: null,
    };
};

export const createAppBookingFromSupabaseBooking = (
    booking: BookingsWithRelated
): AppBooking => {
    return {
        bookingId: booking.id,
        createdAt: booking.created_at,
        startDate: booking.start_date,
        endDate: booking.end_date,
        numNights: booking.number_of_nights,
        numGuests: booking.number_of_guests,
        totalPrice: booking.total_price,
        status: booking.status ? (booking.status as BookingStatus) : null,
        guests: {
            guestName: booking.guests?.full_name,
            email: booking.guests?.email,
        },
        cabins: { cabinName: booking.cabins?.name },
    };
};

export const makeLower = (str: string): string =>
    str.toLowerCase().replace(" ", "-");
