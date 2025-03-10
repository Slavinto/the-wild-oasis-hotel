import { deleteBooking } from "@/services/apiBookings";
import { AppTables } from "@/types/enums";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteBooking = () => {
    const queryClient = useQueryClient();

    const { mutate, error, isPending } = useMutation({
        mutationFn: async (id: number) => {
            // cancel current queries to the bookings table
            await queryClient.cancelQueries({ queryKey: [AppTables.Bookings] });

            return deleteBooking(id);
        },
        mutationKey: [AppTables.Bookings],

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [AppTables.Bookings] });
            toast.success(`Booking successfully deleted`);
        },

        onError: (error) => {
            // rolling back optimistic changes
            toast.success(`Failed to delete booking: ${error.message}`);
        },
    });

    if (error) {
        throw error;
    }

    return { mutate, isPending };
};
