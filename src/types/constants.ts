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
    common_user: "green",
    advanced_user: "brand",
    suspended_user: "grey",
};

export const validateUserFullName = {
    required: "Full name of the user is required",
    minLength: {
        value: userValues.minUserNameLength,
        message: `Full user name must contain at least ${userValues.minUserNameLength} characters`,
    },
    maxLength: {
        value: userValues.maxUserNameLength,
        message: `Full user name must contain maximum of ${userValues.maxUserNameLength} characters`,
    },
};

export const validateUserEmail = {
    required: "User email is required",
    pattern: {
        value: /\S+@\S+\.\S+/,
        message: "Invalid email format",
    },
};

export const validateUserPassword = {
    required: "Password is required",
};

export const validateOldUserPassword = {
    required: false,
};

export const validateUserPasswordLength = {
    minLength: {
        value: userValues.minPasswordLength,
        message: `Password length must be ${userValues.minPasswordLength} characters or more`,
    },
    maxLength: {
        value: userValues.maxPasswordLength,
        message: `Password length must be less than ${userValues.maxPasswordLength} characters`,
    },
};
// ==============================Users==========================
// ==============================Dashboard==========================
export const dashboardFilters = ["last-7-days", "last-30-days", "last-90-days"];
// ==============================Dashboard==========================
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
// ==============================Styles==========================

export const headerButtonStyles = {
    width: "3rem",
    height: "3rem",
    padding: "0",
    // boxShadow: "var(--shadow-sm)",
    boxShadow: "none",
    border: "none",
};

// ==============================Styles==========================
// ==============================Dates==========================
export const months = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
} as const;
// ==============================Dates==========================
