import { useSearchParams } from "react-router-dom";
import { makeLower } from "@/utils/helpers";
import { bookingsTableColumns } from "@/types/constants";
import { BookingsWithRelated } from "@/types/types";

// this sorts and filters bookings on the client
export const useSortBookingsClient = (bookings?: BookingsWithRelated[]) => {
    const [searchParams] = useSearchParams();
    const sortColName = searchParams.get("sort");
    const order = searchParams.get("order");
    const isSortOrderAsc = order === "asc" || !order ? 1 : -1;

    const sortedBookings = bookings?.slice().sort((prevItem, item) => {
        if (!prevItem || !item) {
            return 0;
        }
        switch (sortColName) {
            // sorting by guest name
            case makeLower(bookingsTableColumns[1]):
                return (
                    isSortOrderAsc *
                    (prevItem.guests.full_name || "")?.localeCompare(
                        item.guests.full_name || ""
                    )
                );
            case makeLower(bookingsTableColumns[2]):
                return (
                    isSortOrderAsc *
                    (new Date(prevItem.end_date!).getTime() -
                        new Date(item.end_date!).getTime())
                );
            case makeLower(bookingsTableColumns[3]):
                return (
                    isSortOrderAsc *
                    (prevItem.status || "").localeCompare(item.status || "")
                );
            case makeLower(bookingsTableColumns[4]):
                return (
                    isSortOrderAsc * (prevItem.total_price! - item.total_price!)
                );
            default:
                // sorting by cabin name
                return (
                    isSortOrderAsc *
                    (prevItem.cabins.name || "").localeCompare(
                        item.cabins.name || ""
                    )
                );
        }
    });

    return { sortedBookings };
};
