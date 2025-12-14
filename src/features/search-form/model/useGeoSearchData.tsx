import {
    ENTITY_TYPE,
    selectSelectedType,
    transformCountries,
    useGetCountriesQuery,
    useSearchGeoQuery,
} from "@/entities/tours";
import { DEBOUNCE_DELAY } from "@/shared/config/constants";
import { useAppSelector, useDebounce } from "@/shared/lib";
import { getSearchQuery } from "../lib/getSearchQuery";

interface Params {
    inputValue: string;
}

export const useGeoSearchData = ({ inputValue }: Params) => {
    const type = useAppSelector(selectSelectedType);
    const debouncedInput = useDebounce(inputValue, DEBOUNCE_DELAY);
    const isCountriesMode = !debouncedInput || type === ENTITY_TYPE.COUNTRY;
    const searchQuery = getSearchQuery(type, debouncedInput);

    const { data: countriesMap = {}, isLoading: countriesLoading } = useGetCountriesQuery(
        undefined,
        {
            skip: !isCountriesMode,
        },
    );

    const { data: geoItems = [], isLoading: geoLoading } = useSearchGeoQuery(searchQuery, {
        skip: isCountriesMode || !searchQuery,
    });

    return {
        isCountriesMode,
        searchQuery,
        isLoading: isCountriesMode ? countriesLoading : geoLoading,
        items: isCountriesMode ? transformCountries(countriesMap) : geoItems,
    };
};
