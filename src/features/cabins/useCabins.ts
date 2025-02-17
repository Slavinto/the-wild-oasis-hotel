import { getCabins } from "@/services/apiCabins";
import { useQuery } from "@tanstack/react-query";

export const useCabins = () => {
    const {
        data: cabins,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["cabins"],
        queryFn: getCabins,
    });

    if (error) {
        throw error;
    }

    return { cabins, isLoading };
};
