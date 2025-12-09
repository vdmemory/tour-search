import { type ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";

export const AppProviders = ({ children }: { children: ReactNode }) => {
    return <StoreProvider>{children}</StoreProvider>;
};
