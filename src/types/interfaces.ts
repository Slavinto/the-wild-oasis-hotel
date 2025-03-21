import { Session, User, WeakPassword } from "@supabase/supabase-js";
import { BookingsWithRelated } from "./types";
import { UserActions, UserRoles, UserStatus } from "./enums";

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

export interface AppBookingFull {
    bookingId: number;
    createdAt: string;
    startDate: string | null;
    endDate: string | null;
    numNights: number | null;
    numGuests: number | null;
    totalPrice: number | null;
    status: BookingStatus | null;
    cabinPrice: number | null;
    extrasPrice: number | null;
    hasBreakfast: boolean | null;
    observations: string | null;
    isPaid: boolean | null;
    cabinId: number | null;
    guestId: number | null;
    guests: {
        guestName: string | null;
        email: string | null;
        country: string | null;
        countryFlag: string | null;
        nationalID: string | null;
    };
    cabins: { cabinName: string | null };
}

export interface PaginatedBookings {
    bookings: BookingsWithRelated[];
    totalBookings: number;
}

export interface AppUser {
    user: User;
    session: Session;
    weakPassword?: WeakPassword;
}

export interface AppUserContext {
    user: User | null;
    setUser: (user: User | null) => void;
}

// can be used only when creating new user
// user status is always active
export interface UserSimplified {
    email: string;
    user_metadata: {
        password: string;
        fullName: string;
        avatar: FileList;
        userRole: UserRoles;
        userStatus: UserStatus.Active;
        signedUpBy: User;
    };
}

export interface CreateUserFormFields {
    fullName: string;
    email: string;
    avatar: FileList;
    password: string;
    confirmPassword: string;
    userRole: UserRoles;
    userStatus: UserStatus;
}

export interface ActionPermissionCheck {
    initiatorUser: User | null;
    targetUser?: User | UserSimplified;
    action: UserActions;
}
