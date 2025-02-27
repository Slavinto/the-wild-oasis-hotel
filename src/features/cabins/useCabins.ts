import { getCabins } from "@/services/apiCabins";
import { AppTables } from "@/types/enums";
import { useQuery } from "@tanstack/react-query";

export const useCabins = () => {
    const {
        data: cabins,
        error,
        isLoading,
    } = useQuery({
        queryKey: [AppTables.Cabins],
        queryFn: getCabins,
    });

    if (error) {
        throw error;
    }

    return { cabins, isLoading };
};
