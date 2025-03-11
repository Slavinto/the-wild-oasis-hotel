import BookingRow from "./BookingRow";
import Table from "@/ui/table/Table";
import { bookingsPerPage, bookingsTableColumns } from "@/types/constants";
import { BookingsWithRelated } from "@/types/types";
import { AppTables } from "@/types/enums";
import { Pagination } from "@/ui";
import { useBookingsContext } from "./BookingsContext";

function BookingTable({ bookings }: { bookings: BookingsWithRelated[] }) {
    // const { numBookings } = useNumBookings();
    const { totalBookings } = useBookingsContext();

    return (
        <>
            <Table
                colNames={bookingsTableColumns}
                columns='0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem'
                tableType={AppTables.Bookings}
            >
                <Table.Header />
                {bookings ? (
                    <Table.Body
                        data={bookings}
                        render={(booking) => (
                            <BookingRow key={booking.id} booking={booking} />
                        )}
                    />
                ) : (
                    <Table.Empty />
                )}
                <Table.Footer>
                    <Pagination
                        numItems={totalBookings}
                        itemsPerPage={bookingsPerPage}
                    />
                </Table.Footer>
            </Table>
        </>
    );
}

export default BookingTable;
