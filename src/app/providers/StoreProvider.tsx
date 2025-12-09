"use client";

import { useState, type ReactNode } from "react";
import { Provider } from "react-redux";
import { createAppStore } from "../store";

export const StoreProvider = ({ children }: { children: ReactNode }) => {
    // Use lazy initialization with useState to create store only once
    const [store] = useState(() => createAppStore());

    return <Provider store={store}>{children}</Provider>;
};
