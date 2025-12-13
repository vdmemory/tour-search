import { CountriesMap, GeoEntity, Country } from "@/entities/directory/model/types";

export const transformCountries = (countriesMap: CountriesMap): GeoEntity[] => {
    return Object.values(countriesMap).map((country: Country) => ({
        ...country,
        type: "country",
    })) as GeoEntity[];
};
