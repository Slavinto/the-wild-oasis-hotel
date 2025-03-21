import { useQuery } from "@tanstack/react-query";
import { listUsers } from "@/services/apiAuth";
import { AppEntities } from "@/types/enums";
import { useSafeGlobalUserContext } from "@/ui/globalUser/useSafeGlobalUserContext";

export const useGetAllUsers = () => {
    const { user } = useSafeGlobalUserContext();

    const {
        data,
        refetch: getAllUsers,
        isLoading,
    } = useQuery({
        queryKey: [AppEntities.AppUsers],
        queryFn: () => listUsers(user),
    });

    // useEffect(() => {}, []);
    // useEffect(() => {}, []);
    return { data, getAllUsers, isLoading };
};
