import styled from "styled-components";

import { BookingStatus, ButtonVariations, Headings } from "@/types/enums";
import {
    Row,
    Heading,
    ButtonGroup,
    Button,
    ButtonText,
    BookingIsPaidCheckbox,
    Spinner,
    Checkbox,
} from "@/ui";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import CheckoutButton from "./CheckoutButton";
import { useCheckinBooking } from "./useCheckinBooking";

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
    const {
        id,
        bookingDetails,
        confirmIsPaid,
        hasBreakfast,
        moveBack,
        isLoading,
        isUpdating,
        handleCheckin,
        handleConfirmIsPaid,
        handleToggleHasBreakfast,
    } = useCheckinBooking();

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

                    {
                        <ButtonGroup>
                            {bookingDetails?.status ===
                            BookingStatus.Unconfirmed ? (
                                <>
                                    {hasBreakfast !== null && !confirmIsPaid ? (
                                        <Box>
                                            <Checkbox
                                                id={"breakfast-" + id}
                                                disabled={
                                                    isUpdating || confirmIsPaid!
                                                }
                                                onChange={
                                                    handleToggleHasBreakfast
                                                }
                                                checked={hasBreakfast}
                                            >
                                                Breakfast is included
                                            </Checkbox>
                                        </Box>
                                    ) : null}
                                    <Box>
                                        {confirmIsPaid !== null &&
                                        bookingDetails?.isPaid === false ? (
                                            <BookingIsPaidCheckbox
                                                handleConfirmIsPaid={
                                                    handleConfirmIsPaid
                                                }
                                                isUpdating={isUpdating}
                                                id={id}
                                                confirmIsPaid={confirmIsPaid}
                                            />
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
                            ) : bookingDetails?.status ===
                              BookingStatus.CheckedIn ? (
                                <CheckoutButton
                                    bookingId={id}
                                    guestName={
                                        bookingDetails.guests.guestName || ""
                                    }
                                />
                            ) : null}
                            <Button
                                $variation={ButtonVariations.Secondary}
                                onClick={moveBack}
                            >
                                Back
                            </Button>
                        </ButtonGroup>
                    }
                </>
            )}
        </>
    );
}

export default CheckinBooking;
