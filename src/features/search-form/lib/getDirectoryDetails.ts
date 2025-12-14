import { ENTITY_TYPE, GeoEntity } from "@/entities/tours";

export const getDirectoryDetails = ({ type }: GeoEntity): string => {
    switch (type) {
        case ENTITY_TYPE.COUNTRY:
            return "Країна";
        case ENTITY_TYPE.CITY:
            return "Місто";
        case ENTITY_TYPE.HOTEL:
            return "Готель";
        default:
            return "";
    }

    // TODO: Пізніше додати більше деталей
    //   if (item.type === 'hotel') {
    //     return `${item.cityName}, ${item.countryName}`;
    //   }
};
