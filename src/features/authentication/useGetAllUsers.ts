import { useQuery } from "@tanstack/react-query";
import { listUsers } from "@/services/apiAuth";
import { AppEntities } from "@/types/enums";

export const useGetAllUsers = () => {
    const {
        data: users,
        refetch: getAllUsers,
        isLoading,
    } = useQuery({
        queryKey: [AppEntities.AppUsers],
        queryFn: listUsers,
    });

    // useEffect(() => {}, []);
    // useEffect(() => {}, []);
    return { users, getAllUsers, isLoading };
};
