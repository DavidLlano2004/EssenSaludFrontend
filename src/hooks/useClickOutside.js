import { useEffect } from "react";

export const useClickOutside = (refs, callback) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (Array.isArray(refs)) {
                if (refs.every(ref => ref.current && !ref.current.contains(event.target))) {
                    callback();
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [refs, callback]);
};
