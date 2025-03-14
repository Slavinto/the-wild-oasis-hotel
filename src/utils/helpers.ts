import { Tables } from "@/services/supabaseTypes";
import { cabinValues } from "@/types/constants";
import { AppTables } from "@/types/enums";
import {
    AppBooking,
    AppBookingFull,
    BookingStatus,
    Cabin,
    SupabaseCabin,
} from "@/types/interfaces";
import {
    AppBookingUpdate,
    BookingsWithRelated,
    BookingsWithRelatedFull,
} from "@/types/types";
import { formatDistance, parseISO, differenceInDays, format } from "date-fns";

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1: string, dateStr2: string) =>
    differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr: string) => {
    return dateStr === ""
        ? "Unknown"
        : formatDistance(parseISO(dateStr), new Date(), {
              addSuffix: true,
          })
              .replace("about ", "")
              .replace("in", "In");
};

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

export const createSupabaseFullBookingFromFullAppBooking = (
    booking: AppBookingUpdate
): Partial<Tables<AppTables.Bookings>> => {
    const obj = {
        id: booking?.bookingId,
        created_at: booking?.createdAt,
        start_date: booking?.startDate,
        end_date: booking?.endDate,
        number_of_nights: booking?.numNights,
        number_of_guests: booking?.numGuests,
        total_price: booking?.totalPrice,
        status: booking?.status
            ? (booking?.status as BookingStatus)
            : undefined,
        cabin_price: booking?.cabinPrice,
        extras_price: booking?.extrasPrice,
        has_breakfast: booking?.hasBreakfast,
        observations: booking?.observations,
        is_paid: booking?.isPaid,
        cabin_id: booking?.cabinId,
        guest_id: booking?.guestId,
        // guests: {
        //     full_name: booking.guests.guestName,
        //     email: booking.guests.email,
        //     nationality: booking.guests.country,
        //     country_flag: booking.guests.countryFlag,
        //     national_id: booking.guests.nationalID,
        // },
        // cabins: { name: booking.cabins.cabinName },
    };
    return Object.fromEntries(
        Object.entries(obj).filter(([, value]) => value !== undefined)
    );
};

export const createFullAppBookingFromSupabaseFullBooking = (
    booking: BookingsWithRelatedFull
): AppBookingFull => {
    return {
        bookingId: booking.id,
        createdAt: booking.created_at,
        startDate: booking.start_date,
        endDate: booking.end_date,
        numNights: booking.number_of_nights,
        numGuests: booking.number_of_guests,
        totalPrice: booking.total_price,
        status: booking.status ? (booking.status as BookingStatus) : null,
        cabinPrice: booking.cabin_price,
        extrasPrice: booking.extras_price,
        hasBreakfast: booking.has_breakfast,
        observations: booking.observations,
        isPaid: booking.is_paid,
        cabinId: booking.cabin_id,
        guestId: booking.guest_id,
        guests: {
            guestName: booking.guests?.full_name || null,
            email: booking.guests?.email || null,
            country: booking.guests?.nationality || null,
            countryFlag: booking.guests?.country_flag || null,
            nationalID: booking.guests?.national_id || null,
        },
        cabins: { cabinName: booking.cabins?.name || null },
    };
};

export const makeLower = (str: string): string =>
    str.toLowerCase().replace(" ", "-");

export const CreateArrayOfNum = (num: number): number[] => {
    return Array.from({ length: num }, (_, i) => i + 1);
};

export const generatePages = (numPages: number, activePage: number) => {
    if (numPages <= 5) {
        return CreateArrayOfNum(numPages);
    }

    const pages: (number | string)[] = [1];
    if (activePage > 3) {
        pages.push("...");
    }

    // pages around the active page are rendered as buttons
    const middlePages: (number | string)[] = [
        activePage - 1,
        activePage,
        activePage + 1,
    ].filter((page) => page > 1 && page < numPages);

    pages.push(...middlePages);

    if (activePage < numPages - 2) {
        pages.push("...");
    }

    pages.push(numPages);

    return pages;
};

export const allFormFieldsFilled = (valuesObject: unknown) => {
    return (
        Object.keys(valuesObject as object).length &&
        Object.values(valuesObject as object).every((fieldValue) => fieldValue)
    );
};
