import { ENTITY_TYPE, GeoEntity } from "@/entities/directory";

export const getSearchQuery = (type: GeoEntity["type"] | undefined, value: string) => {
    if (type === ENTITY_TYPE.COUNTRY) {
        return undefined;
    }
    return value || undefined;
};
