// ==============================Cabin==========================
export const cabinValues = {
    MaximumCapacity: 10,
    MinimumCapacity: 1,
    MinimumPrice: 1,
    MininmumDiscount: 0,
} as const;

export type CabinValues = (typeof cabinValues)[keyof typeof cabinValues];

export const bucketNames = {
    cabinImages: "cabin-images",
    avatars: "avatars",
} as const;

export type BucketNames = (typeof bucketNames)[keyof typeof bucketNames];

// ==============================Cabin==========================
// ==============================Booking==========================
export const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
} as const;

// ==============================Booking==========================
// ==============================Users==========================
export const userValues = {
    minPasswordLength: 6,
    maxPasswordLength: 30,
    minUserNameLength: 4,
    maxUserNameLength: 15,
};

export const userTypeToTagName = {
    user: "green",
    admin: "purple",
    unconfirmed: "grey",
};

// ==============================Users==========================
// ==============================Settings==========================
export const settingValues = {
    MinimumNightsMinValue: 1,
    MaximumNightsMinValue: 1,
    MaximumGuests: 10,
    MinimumGuests: 1,
} as const;

export const bookingsPerPage = 5 as const;
// ==============================Settings==========================
// ==============================Tables==========================
export const supabaseTables = {
    bookings: "bookings",
    cabins: "cabins",
    guests: "guests",
    settings: "settings",
} as const;
export type SupabaseTables =
    (typeof supabaseTables)[keyof typeof supabaseTables];

export const cabinTableColumns = [
    "",
    "Cabin",
    "Capacity",
    "Price",
    "Discount",
    "",
];

export const bookingsTableColumns = [
    "Cabin",
    "Guest",
    "Dates",
    "Status",
    "Amount",
    "",
];

export const userTableColumns = [
    "",
    "User name",
    "Role",
    "Email",
    "Last sign in",
    "",
];

// ==============================Tables==========================
// ==============================Menus==========================

// export const CabinRowMenuOptions = ["Duplicate", "Edit", "Delete"];

// ==============================Menus==========================
