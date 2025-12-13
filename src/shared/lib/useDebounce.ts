"use client";

import { useEffect, useState } from "react";
import { DEBOUNCE_DELAY } from "../config/constants";

export const useDebounce = <T>(value: T, delay = DEBOUNCE_DELAY) => {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const id = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(id);
    }, [value, delay]);

    return debounced;
};
