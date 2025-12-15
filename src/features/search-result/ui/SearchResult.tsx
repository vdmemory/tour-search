"use client";

import {
    searchStateSelector,
    ToursEmpty,
    ToursError,
    ToursList,
    ToursPending,
} from "@/entities/tours";
import { MAX_RETRIES } from "@/shared/config/constants";
import { useAppSelector } from "@/shared/lib/redux/hooks";
import { useAggregatedTours } from "../model/useAggregatedTours";

export const SearchResult = () => {
    const {
        isSearching,
        searchResults,
        searchError,
        retryCount,
        selectedDestination,
        searchSessionId,
    } = useAppSelector(searchStateSelector);

    const { toursWithHotels, isHotelsLoading, hotelsError } = useAggregatedTours();

    const isEmptyResults =
        searchResults &&
        toursWithHotels.length === 0 &&
        searchSessionId === selectedDestination?.id;

    const isResultsAvailable = searchResults && toursWithHotels.length > 0;

    if (isSearching) return <ToursPending retryCount={retryCount} maxRetries={MAX_RETRIES} />;

    if (searchError) return <ToursError error={searchError} />;

    if (isHotelsLoading) {
        return <ToursPending message="Завантаження деталей готелів..." />;
    }

    if (hotelsError) return <ToursError error="Помилка завантаження деталей готелів." />;

    if (isEmptyResults) return <ToursEmpty />;

    if (isResultsAvailable) return <ToursList tours={toursWithHotels} />;

    return null;
};
