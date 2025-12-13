import { baseApi } from "@/shared/api/baseApi";
import { configureStore } from "@reduxjs/toolkit";

export const createAppStore = () => {
    return configureStore({
        reducer: {
            [baseApi.reducerPath]: baseApi.reducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
    });
};
