import { createOrUpdateCabin } from "@/services/apiCabins";
import { Tables } from "@/services/supabaseTypes";
import { CabinRowFunctions } from "@/types/enums";
import { Cabin } from "@/types/interfaces";
import {
    createCabinFromSupabaseTableCabin,
    // createSupabaseCabinFromCabin,
} from "@/utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type MutateContextType =
    | {
          prevCabins: Tables<"cabins"> | undefined;
      }
    | undefined;

export const useCreateOrUpdateCabin = (
    dbCabin: Tables<"cabins">,
    cabinRowFunction: CabinRowFunctions
) => {
    // if isDuplicating flag is true using create cabin option
    const currentCabinId = dbCabin?.id;
    const cabin = dbCabin
        ? createCabinFromSupabaseTableCabin(dbCabin)
        : undefined;
    const defaultValues = cabin ? { defaultValues: cabin } : {};
    const form = useForm<Cabin>(defaultValues);
    const { reset, watch } = form;
    const currentValues = watch();
    const isFormChanged =
        JSON.stringify(currentValues) !== JSON.stringify(cabin);

    const queryClient = useQueryClient();
    const { mutate, isPending: isUpdating } = useMutation({
        mutationFn:
            cabinRowFunction === CabinRowFunctions.Create
                ? // creating new cabin through the cabin form component
                  createOrUpdateCabin
                : cabinRowFunction === CabinRowFunctions.Duplicate
                ? // creating new cabin from existing cabin -> duplicating
                  () =>
                      createOrUpdateCabin(
                          cabin && { ...cabin, name: `Copy of ${cabin?.name}` }
                      )
                : // updating existing cabin
                  (newCabin) => createOrUpdateCabin(newCabin, currentCabinId),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
            toast.success(
                `Cabin successfully ${
                    cabinRowFunction === CabinRowFunctions.Create
                        ? "created"
                        : cabinRowFunction === CabinRowFunctions.Update
                        ? "updated"
                        : "duplicated"
                }`
            );
        },
        onError: (
            error: Error,
            newCabin: Cabin,
            context: MutateContextType
        ) => {
            const errMsg = JSON.parse(error.message);
            // rollback UI changes if create cabin fails
            if (context?.prevCabins) {
                queryClient.setQueryData(["cabins"], context.prevCabins);
            }
            toast.error(errMsg);
            throw new Error(
                `Error. Failed to remove a cabin ${
                    newCabin.name
                }: ${JSON.stringify(error)}`
            );
        },
        // runs after all other code
        onSettled: () => {
            reset();
        },
    });
    return {
        cabin,
        form,
        currentValues,
        mutate,
        isFormChanged,
        isUpdating,
        currentCabinId,
    };
};
