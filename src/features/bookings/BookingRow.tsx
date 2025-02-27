import styled from "styled-components";
import { format, isToday } from "date-fns";

import { Tag } from "@/ui";
import Table from "@/ui/table/Table";

import {
    createAppBookingFromSupabaseBooking,
    formatCurrency,
    formatDistanceFromNow,
} from "@/utils/helpers";
import { BookingsWithRelated, SupabaseTable } from "@/types/types";

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Stacked = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    & span:first-child {
        font-weight: 500;
    }

    & span:last-child {
        color: var(--color-grey-500);
        font-size: 1.2rem;
    }
`;

const Amount = styled.div`
    font-family: "Sono";
    font-weight: 500;
`;

function BookingRow({ booking }: { booking: SupabaseTable }) {
    const {
        // bookingId,
        // createdAt,
        startDate,
        endDate,
        numNights,
        // numGuests,
        totalPrice,
        status,
        guests: { guestName, email },
        cabins: { cabinName },
    } = createAppBookingFromSupabaseBooking(booking as BookingsWithRelated);
    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };
    if (!status || !totalPrice) {
        return null;
    }
    return (
        <Table.Row>
            <Cabin>{cabinName}</Cabin>

            <Stacked>
                <span>{guestName}</span>
                <span>{email}</span>
            </Stacked>

            <Stacked>
                <span>
                    {isToday(new Date(startDate || ""))
                        ? "Today"
                        : formatDistanceFromNow(startDate || "")}{" "}
                    &rarr; {numNights} night stay
                </span>
                <span>
                    {format(new Date(startDate || ""), "MMM dd yyyy")} &mdash;{" "}
                    {format(new Date(endDate || ""), "MMM dd yyyy")}
                </span>
            </Stacked>

            <Tag $type={statusToTagName[status]}>
                {status.replace("-", " ")}
            </Tag>

            <Amount>{formatCurrency(totalPrice)}</Amount>
        </Table.Row>
    );
}

export default BookingRow;
