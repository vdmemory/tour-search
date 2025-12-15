import { ENTITY_TYPE, GeoEntity } from "@/entities/tours";

export const getDirectoryDetails = (item: GeoEntity): string => {
    switch (item.type) {
        case ENTITY_TYPE.COUNTRY:
            return "Країна";
        case ENTITY_TYPE.CITY:
            return "Місто";
        case ENTITY_TYPE.HOTEL:
            return `${item.cityName}, ${item.countryName}`;
        default:
            return "";
    }
};
