import { baseApi } from "@/shared/api/baseApi";
import { configureStore } from "@reduxjs/toolkit";
import tourSearchReducer from "@/entities/tours/model/tourSearchSlice";

export const createAppStore = () => {
    return configureStore({
        reducer: {
            tourSearch: tourSearchReducer,
            [baseApi.reducerPath]: baseApi.reducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
    });
};
