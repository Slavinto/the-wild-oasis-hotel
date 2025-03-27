import { getStaysTodayActivity } from "@/services/apiBookings";
import { AppEntities } from "@/types/enums";
import { useQuery } from "@tanstack/react-query";

export const useTodayActivity = () => {
    const {
        data: activity,
        error,
        isLoading,
    } = useQuery({
        queryKey: [AppEntities.TodayBookingActivity],
        queryFn: getStaysTodayActivity,
    });

    if (error) {
        throw error;
    }

    return { activity, isLoading };
};
