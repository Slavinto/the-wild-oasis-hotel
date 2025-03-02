import styled from "styled-components";
import { format, isToday } from "date-fns";

import { ConfirmDelete, Menu, Modal, Tag } from "@/ui";
import Table from "@/ui/table/Table";

import {
    createAppBookingFromSupabaseBooking,
    formatCurrency,
    formatDistanceFromNow,
} from "@/utils/helpers";
import { BookingsWithRelated } from "@/types/types";
import {
    HiEllipsisVertical,
    HiEye,
    HiOutlinePencilSquare,
    HiOutlineTrash,
} from "react-icons/hi2";
import { AppEntities, ModalWindows } from "@/types/enums";
import { useNavigate } from "react-router-dom";
import { statusToTagName } from "@/types/constants";

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

function BookingRow({ booking }: { booking: BookingsWithRelated }) {
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
    } = createAppBookingFromSupabaseBooking(booking);
    const navigate = useNavigate();

    if (!status || !totalPrice) {
        return null;
    }

    function handleConfirmDelete() {}
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
            <Menu id={booking.id}>
                <Menu.Toggle>
                    <HiEllipsisVertical />
                </Menu.Toggle>
                <Menu.List>
                    <Menu.Button
                        disabled={false}
                        onClick={() => navigate(`/bookings/${booking.id}`)}
                    >
                        <HiEye />
                        <span>Inspect</span>
                    </Menu.Button>
                    <Modal>
                        <Modal.Open opens={ModalWindows.UpdateBooking}>
                            <Menu.Button disabled={false}>
                                <HiOutlinePencilSquare />
                                <span>Edit</span>
                            </Menu.Button>
                        </Modal.Open>
                        <Modal.Window
                            name={ModalWindows.UpdateBooking}
                        ></Modal.Window>
                    </Modal>
                    <Modal>
                        <Modal.Open opens={ModalWindows.DeleteBookingConfirm}>
                            <Menu.Button disabled={false}>
                                <HiOutlineTrash />
                                <span>Delete</span>
                            </Menu.Button>
                        </Modal.Open>
                        <Modal.Window name={ModalWindows.DeleteBookingConfirm}>
                            <ConfirmDelete
                                onConfirm={handleConfirmDelete}
                                disabled={false}
                                resourceName={AppEntities.Booking}
                            />
                        </Modal.Window>
                    </Modal>
                </Menu.List>
            </Menu>
        </Table.Row>
    );
}

export default BookingRow;
