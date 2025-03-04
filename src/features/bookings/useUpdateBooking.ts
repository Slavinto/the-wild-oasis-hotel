import { updateBooking } from "@/services/apiBookings";
import { AppTables } from "@/types/enums";
import { AppBookingUpdate } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateBooking = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, obj }: { id: number; obj: AppBookingUpdate }) => {
            console.log({ obj });
            return updateBooking(id, obj);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [AppTables.Bookings] });
        },
        onError: (error) => {
            throw error;
        },
    });
};
