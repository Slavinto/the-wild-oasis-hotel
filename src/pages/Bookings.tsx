import { useState } from "react";
import { BookingsContext } from "@/features/bookings/BookingsContext";
import BookingTable from "@/features/bookings/BookingTable";
import BookingTableOperations from "@/features/bookings/BookingTableOperations";
import { Headings, RowOrientations } from "@/types/enums";
import { Heading, Row, Spinner } from "@/ui";
import { useBookingsInterval } from "@/features/bookings/useBookingsInterval";
import { monthBeforeDate } from "@/utils/helpers";
import { bookings } from "@/data/data-bookings";

function Bookings() {
    // booking interval state
    // if date interval is not set will run the bookings query for the last month
    const [startDate, setStartDate] = useState<Date | null>(null);
    // monthBeforeDate(new Date())
    const [endDate, setEndDate] = useState<Date | null>(null);
    console.log({ startDate, endDate });

    const setStart = (date: Date | null) => setStartDate(date);
    const setEnd = (date: Date | null) => setEndDate(date);

    const { isLoading, sortedBookings } = useBookingsInterval([
        startDate,
        endDate,
    ]);

    return (
        <>
            <BookingsContext.Provider
                value={{ startDate, setStart, endDate, setEnd }}
            >
                <Row type={RowOrientations.Horizontal}>
                    <Heading text='Manage Bookings' as={Headings.H1} />
                    <BookingTableOperations />
                </Row>
                <Row>
                    {/* {isLoading || !sortedBookings ? ( */}
                    {isLoading || !sortedBookings ? (
                        <Spinner />
                    ) : (
                        // <BookingTable bookings={sortedBookings} />
                        <>
                            <h1>
                                {sortedBookings.length} bookings sorted out from{" "}
                                {bookings.length}
                            </h1>
                            <BookingTable bookings={sortedBookings} />
                        </>
                    )}
                </Row>
            </BookingsContext.Provider>
        </>
    );
}

export default Bookings;
