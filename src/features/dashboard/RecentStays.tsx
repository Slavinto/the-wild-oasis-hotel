import React from "react";
import { useRecentStays } from "./useRecentStays";

const RecentStays = () => {
    const { stays, isLoading } = useRecentStays();
    return (
        <div>
            {stays?.map((stay) => (
                <div key={stay.id}>{stay.id}</div>
            ))}
        </div>
    );
};

export default RecentStays;
