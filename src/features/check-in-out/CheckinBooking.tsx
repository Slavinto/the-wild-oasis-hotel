import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import {
    AppEntities,
    AppOperations,
    BookingStatus,
    ButtonVariations,
    Headings,
    ModalWindows,
} from "@/types/enums";
import { useNavigate, useParams } from "react-router-dom";
import { useBookingDetails } from "../bookings/useBookingDetails";
import { Checkbox, Modal, Spinner } from "@/ui";
import { useEffect, useState } from "react";
import ConfirmOperation from "@/ui/ConfirmOperation";
import { useUpdateBooking } from "../bookings/useUpdateBooking";

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.6rem 2rem;
    box-shadow: var(--shadow-md);
    /* padding: 2.4rem 4rem; */
`;

function CheckinBooking() {
    const [confirmIsPaid, setConfirmIsPaid] = useState<boolean | null>(null);

    const navigate = useNavigate();
    const moveBack = useMoveBack();
    const params = useParams();
    const id = Number(params.id);
    const { bookingDetails, isLoading } = useBookingDetails(id);
    const { mutate: updateBooking, isPending: isUpdating } = useUpdateBooking();

    useEffect(() => {
        if (bookingDetails) {
            setConfirmIsPaid(bookingDetails.isPaid);
        }
    }, [bookingDetails, isLoading]);

    // console.log({ bookingDetails });
    // console.log({ confirmIsPaid });

    // const { guests, totalPrice, numGuests, hasBreakfast, numNights } =
    //     bookingDetails || {};

    function handleCheckin() {
        if (
            !confirmIsPaid ||
            bookingDetails?.status !== BookingStatus.Unconfirmed
        ) {
            return;
        }
        updateBooking({ id, obj: { status: BookingStatus.CheckedIn } });
        navigate(`/bookings/${id}`);
    }

    function handleConfirmIsPaid() {
        if (!bookingDetails) return;
        const isPaid = !bookingDetails.isPaid;
        updateBooking({ id, obj: { isPaid } });
        // setConfirmIsPaid((prev) => !prev);
    }

    return (
        <>
            <Row>
                <Heading as={Headings.H1} text={`Check in booking ${id}`} />
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <BookingDataBox booking={bookingDetails} />

                    {isUpdating ? (
                        <Spinner />
                    ) : (
                        <ButtonGroup>
                            {bookingDetails?.status ===
                                BookingStatus.Unconfirmed && (
                                <>
                                    <Box>
                                        {confirmIsPaid !== null &&
                                        bookingDetails?.isPaid === false ? (
                                            <Modal>
                                                <Modal.Open
                                                    opens={
                                                        ModalWindows.IsBookingPayedConfirm
                                                    }
                                                >
                                                    <Checkbox
                                                        checked={confirmIsPaid}
                                                        disabled={
                                                            confirmIsPaid ||
                                                            isUpdating
                                                        }
                                                        id={`${id}`}
                                                        onChange={() => {}}
                                                        // onChange={handleConfirmIsPaid}
                                                    >
                                                        Check for payed booking
                                                    </Checkbox>
                                                </Modal.Open>
                                                <Modal.Window
                                                    name={
                                                        ModalWindows.IsBookingPayedConfirm
                                                    }
                                                >
                                                    <ConfirmOperation
                                                        operation={
                                                            AppOperations.Payment
                                                        }
                                                        onConfirm={
                                                            handleConfirmIsPaid
                                                        }
                                                        disabled={false}
                                                        resourceName={
                                                            AppEntities.Booking
                                                        }
                                                    />
                                                </Modal.Window>
                                            </Modal>
                                        ) : (
                                            <div>Booking has been paid</div>
                                        )}
                                    </Box>
                                    <Button
                                        onClick={handleCheckin}
                                        disabled={!confirmIsPaid}
                                    >
                                        Check in booking #{id}
                                    </Button>
                                </>
                            )}
                            <Button
                                $variation={ButtonVariations.Secondary}
                                onClick={moveBack}
                            >
                                Back
                            </Button>
                        </ButtonGroup>
                    )}
                </>
            )}
        </>
    );
}

export default CheckinBooking;
