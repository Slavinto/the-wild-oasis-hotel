// ==============================Generic=======================

export enum AppEntities {
    Cabin = "cabin",
    Booking = "booking",
}

export enum AppTables {
    Bookings = "bookings",
    Cabins = "cabins",
    Guests = "guests",
    Settings = "settings",
}

export enum AppOperations {
    Delete = "Delete",
    Payment = "Payment",
    CheckOut = "Check out",
}
// ==============================Generic=======================
// ==============================Headings=======================
export enum Headings {
    H1 = "h1",
    H2 = "h2",
    H3 = "h3",
}
// ==============================Headings=======================
// ==============================Rows===========================
// cabins
export enum RowOrientations {
    Horizontal = "horizontal",
    Vertical = "vertical",
}

export enum CreateUserFormRowLabels {
    FullName = "Full name",
    EmailAddress = "Email address",
    Password = "Password (min 8 characters)",
    RepeatPassword = "Repeat password",
    AvatarImage = "Avatar image",
}

export enum CreateCabinRowLabels {
    CabinName = "Cabin name",
    MaximumCapacity = "Maximum capacity",
    RegularPrice = "Regular price",
    Discount = "Discount",
    DescriptionForWebsite = "Description for website",
    CabinPhoto = "Cabin photo",
}
// bookings
export enum BookingStatus {
    Unconfirmed = "unconfirmed",
    CheckedIn = "checked-in",
    CheckedOut = "checked-out",
}

export enum UpdateSettingsFormLabels {
    MinNightsBooking = "Minimum nights/booking",
    MaxNightsBooking = "Maximum nights/booking",
    MaxGuestsBooking = "Maximum guests/booking",
    BreakfastPrice = "Breakfast price",
}

// ==============================Rows===========================
// ==============================Buttons========================
export enum ButtonVariations {
    Primary = "primary",
    Secondary = "secondary",
    Danger = "danger",
}

export enum ButtonSizes {
    Small = "small",
    Medium = "medium",
    Large = "large",
}

export enum CabinRowFunctions {
    Create = "create",
    Update = "update",
    Duplicate = "duplicate",
    Delete = "delete",
}

// ==============================Buttons========================
// ==============================Modals========================

export enum ModalWindows {
    // cabins
    CabinForm = "cabin-form",
    DeleteCabinConfirm = "delete-cabin-confirm",
    UpdateCabin = "update-cabin",
    Table = "table",
    // bookings
    DeleteBookingConfirm = "delete-booking-confirm",
    CheckIn = "check-in",
    CheckOut = "check-out",
    IsBookingPayedConfirm = "is-booking-payed-confirm",
}

// ==============================Modals========================
// ==============================Input==========================
export enum InputIds {
    FullName = "fullName",
    Email = "email",
    Password = "password",
    PasswordConfirm = "passwordConfirm",
}
// ==============================Input==========================
// ==============================Filters==========================

export enum CabinFilters {
    All = "all",
    Discount = "discount",
    NoDiscount = "no-discount",
}

// ==============================Filters==========================
