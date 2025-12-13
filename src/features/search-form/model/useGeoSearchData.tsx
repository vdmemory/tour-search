import {
    ENTITY_TYPE,
    GeoEntity,
    transformCountries,
    useGetCountriesQuery,
    useSearchGeoQuery,
} from "@/entities/directory";
import { DEBOUNCE_DELAY } from "@/shared/config/constants";
import { useDebounce } from "@/shared/lib";
import { useMemo } from "react";
import { getSearchQuery } from "../lib/getSearchQuery";

interface GeoSearchDataParams {
    inputValue: string;
    selectedType: GeoEntity["type"] | undefined;
}

interface GeoSearchResult {
    isCountriesMode: boolean;
    isLoading: boolean;
    items: GeoEntity[];
    searchQuery: string | undefined;
}

export const useGeoSearchData = ({
    inputValue,
    selectedType,
}: GeoSearchDataParams): GeoSearchResult => {
    const debouncedValue = useDebounce(inputValue, DEBOUNCE_DELAY);
    const isCountriesMode =
        (inputValue === "" && !selectedType) || selectedType === ENTITY_TYPE.COUNTRY;
    const searchQuery = getSearchQuery(selectedType, debouncedValue);

    const { data: countriesMap = {}, isLoading: isLoadingCountries } = useGetCountriesQuery(
        undefined,
        {
            skip: !isCountriesMode,
        },
    );

    const countriesData: GeoEntity[] = useMemo(
        () => transformCountries(countriesMap),
        [countriesMap],
    );

    const { data: geoData = [], isLoading: isLoadingGeo } = useSearchGeoQuery(searchQuery, {
        skip: !searchQuery,
    });

    const isLoading = isCountriesMode ? isLoadingCountries : isLoadingGeo;

    const items = useMemo(() => {
        if (isCountriesMode) return countriesData;
        return geoData;
    }, [isCountriesMode, countriesData, geoData]);

    return {
        isCountriesMode,
        isLoading,
        items,
        searchQuery,
    };
};
