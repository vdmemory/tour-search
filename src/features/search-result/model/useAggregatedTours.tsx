import { useEffect, useMemo } from "react";
import { useAppSelector } from "@/shared/lib/redux/hooks";
import { ENTITY_TYPE, searchStateSelector } from "@/entities/tours";
import { useLazyGetHotelsQuery } from "@/entities/tours/api/tourApi";
import type { PriceOffer, HotelsMap, TourWithHotel } from "@/entities/tours";

export const useAggregatedTours = () => {
    const { searchResults, selectedDestination } = useAppSelector(searchStateSelector);

    const [fetchHotels, { data: hotels, isLoading: isHotelsLoading, error: hotelsQueryError }] =
        useLazyGetHotelsQuery();

    // Fetch hotels when we have search results
    useEffect(() => {
        if (searchResults && selectedDestination) {
            let countryID: string | undefined;

            if (selectedDestination.type === ENTITY_TYPE.HOTEL) {
                countryID = selectedDestination.countryId;
            } else if (
                selectedDestination.type === ENTITY_TYPE.CITY ||
                selectedDestination.type === ENTITY_TYPE.COUNTRY
            ) {
                countryID = String(selectedDestination.id);
            }

            if (countryID) {
                fetchHotels(countryID);
            }
        }
    }, [searchResults, selectedDestination, fetchHotels]);

    // Aggregate tours with hotel data
    const toursWithHotels = useMemo((): TourWithHotel[] => {
        if (!searchResults || !hotels) return [];

        const hotelsMap: HotelsMap = hotels;

        const toursWithHotelData = Object.values(searchResults)
            .map((tour: PriceOffer) => {
                const hotel = tour.hotelID ? hotelsMap[tour.hotelID] : undefined;
                if (!hotel) return null;
                return { ...tour, hotel } as TourWithHotel;
            })
            .filter((tour): tour is TourWithHotel => tour !== null)
            .sort((a, b) => a.amount - b.amount);

        return toursWithHotelData;
    }, [searchResults, hotels]);

    return {
        toursWithHotels,
        isHotelsLoading,
        hotelsError: hotelsQueryError,
    };
};
