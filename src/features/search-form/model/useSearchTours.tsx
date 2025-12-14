"use client";

import { useCallback } from "react";
import {
    searchStateSelector,
    startSearch,
    setSearchToken,
    setSearchError,
    ErrorResponse,
} from "@/entities/tours";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { useStartSearchMutation } from "@/entities/tours/api/tourApi";
import { useTourSearchPolling } from "./useTourSearchPolling";

export function useSearchTours() {
    const dispatch = useAppDispatch();
    const { isSearching } = useAppSelector(searchStateSelector);

    useTourSearchPolling();
    const [startSearchApi] = useStartSearchMutation();

    const searchTours = useCallback(
        async (countryID: string) => {
            dispatch(startSearch());

            try {
                const result = await startSearchApi(countryID).unwrap();

                dispatch(
                    setSearchToken({
                        token: result.token,
                        waitUntil: result.waitUntil,
                    }),
                );
            } catch (err: unknown) {
                const errorData = err as { status: number; data: ErrorResponse };
                dispatch(setSearchError(errorData.data?.message || "Помилка при запуску пошуку."));
            }
        },
        [dispatch, startSearchApi],
    );

    return {
        startSearchTours: searchTours,
        isSearchingTours: isSearching,
    };
}
