import styled from "styled-components";
import { format, isToday } from "date-fns";

import { Menu, Modal, Tag } from "@/ui";
import Table from "@/ui/table/Table";

import {
    createAppBookingFromSupabaseBooking,
    formatCurrency,
    formatDistanceFromNow,
} from "@/utils/helpers";
import { BookingsWithRelated } from "@/types/types";
import {
    HiArrowDownOnSquare,
    HiArrowUpOnSquare,
    HiEllipsisVertical,
    HiEye,
    HiOutlineTrash,
} from "react-icons/hi2";
import {
    AppEntities,
    AppOperations,
    BookingStatus,
    ModalWindows,
} from "@/types/enums";
import { useNavigate } from "react-router-dom";
import { statusToTagName } from "@/types/constants";
import ConfirmOperation from "@/ui/ConfirmOperation";
import { useCheckoutBooking } from "../check-in-out/useCheckoutBooking";
import { useGlobalSpinnerContext } from "@/ui/globalSpinner/GlobalSpinnerContext";
import { useEffect } from "react";

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
        bookingId: id,
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
    const { checkoutBooking, isCheckingOut } = useCheckoutBooking(
        id,
        guestName || "Guest"
    );
    const { showGlobalSpinner, toggleGlobalSpinner } =
        useGlobalSpinnerContext();

    useEffect(() => {
        if (
            (isCheckingOut && !showGlobalSpinner) ||
            (!isCheckingOut && showGlobalSpinner)
        ) {
            toggleGlobalSpinner?.();
        }
    }, [isCheckingOut, toggleGlobalSpinner, showGlobalSpinner]);

    if (!status || !totalPrice) {
        return null;
    }

    function handleConfirmDelete() {
        console.log("booking deletion confirmed");
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
                    {booking.status === BookingStatus.Unconfirmed ? (
                        <Menu.Button
                            onClick={() =>
                                navigate(`/bookings/check-in/${booking.id}`)
                            }
                            disabled={isCheckingOut}
                        >
                            <HiArrowDownOnSquare />
                            <span>Check in</span>
                        </Menu.Button>
                    ) : booking.status === BookingStatus.CheckedIn ? (
                        <Modal>
                            <Modal.Open opens={ModalWindows.CheckOut}>
                                <Menu.Button disabled={isCheckingOut}>
                                    <HiArrowUpOnSquare />
                                    <span>Check out</span>
                                </Menu.Button>
                            </Modal.Open>
                            <Modal.Window name={ModalWindows.CheckOut}>
                                <ConfirmOperation
                                    disabled={isCheckingOut}
                                    onConfirm={checkoutBooking}
                                    operation={AppOperations.CheckOut}
                                    resourceName={AppEntities.Booking}
                                />
                            </Modal.Window>
                        </Modal>
                    ) : null}
                    <Modal>
                        <Modal.Open opens={ModalWindows.DeleteBookingConfirm}>
                            <Menu.Button disabled={false}>
                                <HiOutlineTrash />
                                <span>Delete</span>
                            </Menu.Button>
                        </Modal.Open>
                        <Modal.Window name={ModalWindows.DeleteBookingConfirm}>
                            <ConfirmOperation
                                operation={AppOperations.Delete}
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
