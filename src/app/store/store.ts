import { configureStore } from "@reduxjs/toolkit";

export const createAppStore = () => {
    return configureStore({
        reducer: {},
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
    });
};

export type AppStore = ReturnType<typeof createAppStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
