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
// ==============================Supabase==========================
// ==============================Tables==========================
export const supabaseTables = {
    bookings: "bookings",
    cabins: "cabins",
    guests: "guests",
    settings: "settings",
} as const;
export type SupabaseTables =
    (typeof supabaseTables)[keyof typeof supabaseTables];

// ==============================Tables==========================
// ==============================Supabase==========================
