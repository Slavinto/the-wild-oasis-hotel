import { getSettings } from "@/services/apiSettings";
import { useQuery } from "@tanstack/react-query";

export const useSettings = () => {
    return useQuery({ queryKey: ["settings"], queryFn: getSettings });
};
