import { updateBooking } from "@/services/apiBookings";
import { getSettings } from "@/services/apiSettings";
import { AppEntities, AppTables } from "@/types/enums";
import { AppBookingUpdate } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdateBooking = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
            obj,
        }: {
            id: number;
            guestName: string;
            obj: AppBookingUpdate;
        }) => {
            if (Object.keys(obj).includes("hasBreakfast")) {
                //fetching breakfast price
                const { breakfast_price } = await getSettings();
                if (
                    !breakfast_price ||
                    !obj.numGuests ||
                    !obj.cabinPrice ||
                    !obj.numNights
                ) {
                    throw new Error(
                        "Failed to update booking prices - not enough data"
                    );
                }
                // extras_price is a counted for a booking price of breakfast
                const bookingBreakfastPrice =
                    breakfast_price * obj.numGuests * obj.numNights;

                const totalPriceWbreakfast = obj["hasBreakfast"]
                    ? obj.cabinPrice + bookingBreakfastPrice
                    : obj.cabinPrice;

                return updateBooking(id, {
                    ...obj,
                    totalPrice: totalPriceWbreakfast,
                    extrasPrice: obj["hasBreakfast"]
                        ? bookingBreakfastPrice
                        : 0,
                });
            }
            return updateBooking(id, obj);
        },
        onSuccess: (_, { guestName }) => {
            toast.success(`${guestName}'s booking successfully updated`);
            queryClient.invalidateQueries({
                queryKey: [AppTables.Bookings],
            });
            queryClient.invalidateQueries({
                queryKey: [AppEntities.TodayBookingActivity],
            });
        },
        onError: (error, { guestName }) => {
            toast.error(
                `Failed to update ${guestName}'s booking: ${error.message}`
            );
            throw error;
        },
    });
};
