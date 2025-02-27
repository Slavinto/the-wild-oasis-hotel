export interface Cabin {
    id?: number;
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    description: string;
    imageUrl: string;
    // is being added to cabin on create cabin form submit
    image: File | null;
}

export interface SupabaseCabin {
    id?: number;
    name: string;
    max_capacity: number;
    regular_price: number;
    discount: number;
    description: string;
    image_url: string;
}

export type BookingStatus = "unconfirmed" | "checked-in" | "checked-out";

export interface AppBooking {
    bookingId: number;
    createdAt: string;
    startDate: string | null;
    endDate: string | null;
    numNights: number | null;
    numGuests: number | null;
    totalPrice: number | null;
    status: BookingStatus | null;
    guests: { guestName?: string | null; email?: string | null };
    cabins: { cabinName?: string | null };
}
