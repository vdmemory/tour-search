import { baseApi } from "@/shared/api/baseApi";
import { CountriesMap, GeoEntity, GeoResponse } from "../model/types";
import { getCountries, run, searchGeo } from "@/shared/api/mockApi";

export const directoryApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getCountries: build.query<CountriesMap, void>({
            queryFn: () => run(getCountries),
            providesTags: ["Countries"],
        }),

        searchGeo: build.query<GeoEntity[], string | undefined>({
            queryFn: async (query) => {
                const result = await run(() => searchGeo(query));

                if (result.error) {
                    return { error: result.error as unknown };
                }

                const geoResponseData = result.data as GeoResponse;
                const transformedData: GeoEntity[] = Object.values(geoResponseData);
                return { data: transformedData };
            },
            providesTags: ["Geo"],
        }),
    }),
});

export const { useGetCountriesQuery, useSearchGeoQuery } = directoryApi;
