import { getCabins } from "@/services/apiCabins";
import { useQuery } from "@tanstack/react-query";

export const useCabins = () => {
    const cabins = useQuery({
        queryKey: ["cabins"],
        queryFn: getCabins,
    });

    return { ...cabins };
};
