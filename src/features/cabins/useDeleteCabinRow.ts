import { removeCabin } from "@/services/apiCabins";
import { Tables } from "@/services/supabaseTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

type MutateContextType =
    | {
          prevCabins: Tables<"cabins"> | undefined;
      }
    | undefined;

export const useDeleteCabinRow = (cabin: Tables<"cabins">) => {
    const [showForm, setShowForm] = useState(false);
    const queryClient = useQueryClient();
    if (!cabin) throw new Error(`Error. Invalid cabin object: ${cabin}`);
    if (!cabin.id || !cabin.name)
        throw new Error("Error. Invalid cabin name or id.");

    const { mutate, isPending: isDeleting } = useMutation({
        mutationFn: () => removeCabin(cabin),
        onMutate: async (cabinId) => {
            const confirmed = window.confirm(
                `Are you sure you want to remove this cabin?`
            );
            if (!confirmed) {
                throw new Error("Error. Cancelled by user");
            }

            // optimistically update the UI
            const prevCabins = queryClient.getQueryData(["cabins"]);
            queryClient.setQueryData(
                ["cabins"],
                (oldCabins: Tables<"cabins">[]) =>
                    oldCabins.filter((oldCabin) => oldCabin.id !== cabinId)
            );

            // return context to rollback
            return { prevCabins } as MutateContextType;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
            toast.success("Cabin successfully deleted");
        },
        onError: (
            error: Error,
            cabinId: number,
            context: MutateContextType
        ) => {
            // rollback UI changes if update failed
            if (context?.prevCabins) {
                queryClient.setQueryData(["cabins"], context.prevCabins);
            }
            toast.error(error.message);
            throw new Error(
                `Error. Failed to remove a cabin ${cabinId}: ${JSON.stringify(
                    error
                )}`
            );
        },
    });
    return { showForm, setShowForm, mutate, isDeleting };
};
