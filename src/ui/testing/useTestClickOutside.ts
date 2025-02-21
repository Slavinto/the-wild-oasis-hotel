import { useEffect, useRef } from "react";

export const useTestClickOutside = (handler: () => void) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            console.log("running handleClick");
            if (ref.current && !ref.current.contains(e.target as Node)) {
                // setTimeout(() => handler(), 200);
                handler();
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [handler]);

    return ref;
};
