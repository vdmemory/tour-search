import { baseApi } from "@/shared/api/baseApi";
import {
    CountriesMap,
    GeoEntity,
    GeoResponse,
    GetSearchPricesResponse,
    StartSearchResponse,
} from "../model/types";

import {
    getCountries,
    getSearchPrices,
    run,
    searchGeo,
    startSearchPrices,
} from "@/shared/api/mockApi";

export const tourApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getCountries: build.query<CountriesMap, void>({
            queryFn: () => run<CountriesMap>(getCountries),
            providesTags: ["Countries"],
        }),

        searchGeo: build.query<GeoEntity[], string | undefined>({
            queryFn: async (query) => {
                const result = await run<GeoResponse>(() => searchGeo(query));

                if ("error" in result) {
                    return { error: result.error };
                }

                const geoResponseData = result.data;
                const transformedData: GeoEntity[] = Object.values(geoResponseData);
                return { data: transformedData };
            },
            providesTags: ["Geo"],
        }),

        startSearch: build.mutation<StartSearchResponse, string>({
            queryFn: (countryId) => run<StartSearchResponse>(() => startSearchPrices(countryId)),
        }),

        getSearchPrices: build.query<GetSearchPricesResponse, string>({
            queryFn: (token) => run<GetSearchPricesResponse>(() => getSearchPrices(token)),

            providesTags: (result) =>
                result?.prices
                    ? [
                          "Prices",
                          ...Object.keys(result.prices).map((id) => ({
                              type: "Price" as const,
                              id,
                          })),
                      ]
                    : ["Prices"],
        }),
    }),
});

export const {
    useGetCountriesQuery,
    useSearchGeoQuery,
    useStartSearchMutation,
    useLazyGetSearchPricesQuery,
} = tourApi;
