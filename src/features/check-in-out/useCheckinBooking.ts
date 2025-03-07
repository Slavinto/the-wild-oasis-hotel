import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useMoveBack } from "@/hooks/useMoveBack";

import { useBookingDetails } from "../bookings/useBookingDetails";
import { useUpdateBooking } from "../bookings/useUpdateBooking";
import { BookingStatus } from "@/types/enums";

export const useCheckinBooking = () => {
    const [confirmIsPaid, setConfirmIsPaid] = useState<boolean | null>(null);
    const [guestName, setGuestName] = useState("Guest");
    const [hasBreakfast, setHasBreakfast] = useState<boolean | null>(null);

    const navigate = useNavigate();
    const moveBack = useMoveBack();
    const params = useParams();
    const id = Number(params.id);
    const { bookingDetails, isLoading } = useBookingDetails(id);
    const { mutate: updateBooking, isPending: isUpdating } = useUpdateBooking();

    useEffect(() => {
        if (bookingDetails) {
            if (bookingDetails.guests.guestName) {
                setGuestName(bookingDetails.guests.guestName);
            }
            setHasBreakfast(bookingDetails.hasBreakfast);
            setConfirmIsPaid(bookingDetails.isPaid);
        }
    }, [bookingDetails]);

    // change booking status to checked-in
    function handleCheckin() {
        if (
            !confirmIsPaid ||
            bookingDetails?.status !== BookingStatus.Unconfirmed
        ) {
            return;
        }
        updateBooking({
            id,
            guestName,
            obj: { status: BookingStatus.CheckedIn },
        });
        navigate(`/bookings/${id}`);
    }

    // confirm that booking payment has been made
    function handleConfirmIsPaid() {
        if (!bookingDetails || bookingDetails.isPaid) return;
        // const isPaid = !bookingDetails.isPaid;
        updateBooking({ id, guestName, obj: { isPaid: true } });
    }

    // toggle breakfast option in booking
    function handleToggleHasBreakfast() {
        if (!bookingDetails) {
            return;
        }

        updateBooking({
            id,
            guestName,
            obj: {
                hasBreakfast: !bookingDetails.hasBreakfast,
                cabinPrice: bookingDetails.cabinPrice,
                numGuests: bookingDetails.numGuests,
                numNights: bookingDetails.numNights,
            },
        });
    }

    return {
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
    };
};
