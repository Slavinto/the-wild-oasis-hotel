// import { useQueryClient } from "@tanstack/react-query";
import { useUpdateBooking } from "../bookings/useUpdateBooking";
import { BookingStatus } from "@/types/enums";

export const useCheckoutBooking = (id: number, guestName: string) => {
    // const queryClient = useQueryClient();
    const { mutate: updateBooking, isPending: isUpdating } = useUpdateBooking();

    return {
        checkoutBooking: () =>
            updateBooking({
                id,
                guestName,
                obj: { status: BookingStatus.CheckedOut },
            }),
        isCheckingOut: isUpdating,
    };
};
