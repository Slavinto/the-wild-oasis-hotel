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
// ==============================Settings==========================
export const settingValues = {
    MinimumNightsMinValue: 1,
    MaximumNightsMinValue: 1,
    MaximumGuests: 10,
    MinimumGuests: 1,
} as const;

export const bookingsPerPage = 4 as const;
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
// ==============================Tables==========================
// ==============================Menus==========================

// export const CabinRowMenuOptions = ["Duplicate", "Edit", "Delete"];

// ==============================Menus==========================
