import { useCallback, useEffect, useRef } from "react";
import {
    searchStateSelector,
    setWaitUntil,
    setSearchResults,
    setSearchError,
    incrementRetry,
    ErrorResponse,
} from "@/entities/tours";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { useLazyGetSearchPricesQuery } from "@/entities/tours/api/tourApi";
import { MAX_RETRIES, RETRY_DELAY_MS } from "@/shared/config/constants";

export const useTourSearchPolling = () => {
    const dispatch = useAppDispatch();
    const { isSearching, searchToken, retryCount, waitUntil } = useAppSelector(searchStateSelector);

    const pollingTimer = useRef<NodeJS.Timeout | null>(null);
    const pollResultsRef = useRef<() => Promise<void>>(async () => {});

    const [getSearchPricesApi] = useLazyGetSearchPricesQuery();

    const pollResults = useCallback(async () => {
        if (!searchToken) return;

        try {
            const pricesResult = await getSearchPricesApi(searchToken).unwrap();
            dispatch(setSearchResults(pricesResult.prices));
            return;
        } catch (err: unknown) {
            const errorData = err as { status: number; data: ErrorResponse };

            if (errorData.status === 425 && errorData.data.waitUntil) {
                dispatch(setWaitUntil(errorData.data.waitUntil));
                return;
            }

            if (errorData.status === 404) {
                dispatch(setSearchError("Пошук не знайдено. Спробуйте ще раз."));
                return;
            }

            if (retryCount < MAX_RETRIES) {
                dispatch(incrementRetry());
                const nextRetryTime = new Date(Date.now() + RETRY_DELAY_MS).toISOString();
                dispatch(setWaitUntil(nextRetryTime));
                return;
            }

            dispatch(
                setSearchError(
                    errorData.data?.message ||
                        "Не вдалося отримати результати пошуку. Спробуйте ще раз.",
                ),
            );
        }
    }, [searchToken, getSearchPricesApi, dispatch, retryCount]);

    useEffect(() => {
        pollResultsRef.current = pollResults;
    }, [pollResults]);

    useEffect(() => {
        if (!isSearching || !searchToken || !waitUntil) return;

        if (pollingTimer.current) {
            clearTimeout(pollingTimer.current);
            pollingTimer.current = null;
        }

        const waitTime = new Date(waitUntil).getTime() - Date.now();

        if (waitTime > 0) {
            pollingTimer.current = setTimeout(pollResultsRef.current, waitTime);
        } else {
            pollResultsRef.current();
        }

        return () => {
            if (pollingTimer.current) {
                clearTimeout(pollingTimer.current);
            }
        };
    }, [isSearching, searchToken, waitUntil]);
};
