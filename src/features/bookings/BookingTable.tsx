import BookingRow from "./BookingRow";
import Table from "@/ui/table/Table";
import { bookingsTableColumns } from "@/types/constants";
import { BookingsWithRelated } from "@/types/types";
import { AppTables } from "@/types/enums";

function BookingTable({ bookings }: { bookings: BookingsWithRelated[] }) {
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
            </Table>
        </>
    );
}

export default BookingTable;
