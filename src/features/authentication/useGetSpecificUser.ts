import { getUserById } from "@/services/apiAuth";
import { AppEntities } from "@/types/enums";
import { useSafeGlobalUserContext } from "@/ui/globalUser/useSafeGlobalUserContext";
import { useQuery } from "@tanstack/react-query";

export const useGetSpecificUser = (id: string) => {
    const { user } = useSafeGlobalUserContext();

    const {
        data,
        error,
        refetch: getUser,
        isLoading,
    } = useQuery({
        queryKey: [AppEntities.AppUsers, id],
        queryFn: ({ queryKey }) => getUserById(queryKey[1], user),
    });

    if (error) {
        throw error;
    }

    return { data, getUser, isLoading };
};
