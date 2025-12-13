import { ENTITY_TYPE, GeoEntity } from "../model/types";

export const getDirectoryIcon = ({ type }: GeoEntity): string => {
    switch (type) {
        case ENTITY_TYPE.COUNTRY:
            return "🌍";
        case ENTITY_TYPE.CITY:
            return "🏙️";
        case ENTITY_TYPE.HOTEL:
            return "🏨";
        default:
            return "📍";
    }
};
