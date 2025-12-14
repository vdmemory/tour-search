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

export const SearchResult = () => {
    const { isSearching, searchResults, searchError, retryCount } =
        useAppSelector(searchStateSelector);

    const resultsCount = searchResults ? Object.keys(searchResults).length : null;

    if (isSearching) return <ToursPending retryCount={retryCount} maxRetries={MAX_RETRIES} />;
    if (searchError) return <ToursError error={searchError} />;
    if (resultsCount !== null && resultsCount === 0) return <ToursEmpty />;
    if (resultsCount && resultsCount > 0) return <ToursList />;

    return null;
};
