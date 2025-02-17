import { useEffect, useRef } from "react";

export const useClickOutside = (
    handler: () => void,
    listenCapturing: boolean = true
) => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                handler();
            }
        };
        document.addEventListener("click", handleClick, listenCapturing);
        return () => {
            document.removeEventListener("click", handleClick, listenCapturing);
        };
    }, [handler, ref, listenCapturing]);

    return { ref };
};
