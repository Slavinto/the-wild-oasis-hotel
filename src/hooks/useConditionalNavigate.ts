import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useConditionalNavigate = (condition: boolean, route: string) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (condition) {
            navigate(route);
        }
    }, [condition, route, navigate]);
};
