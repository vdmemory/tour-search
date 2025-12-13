import { useState } from "react";
import { GeoEntity } from "@/entities/directory/model/types";

export const useDropdownSelection = () => {
    const [selected, setSelected] = useState<GeoEntity | null>(null);

    const select = (entity: GeoEntity) => {
        setSelected(entity);
    };

    return {
        selected,
        select,
        selectedType: selected?.type,
        reset: () => setSelected(null),
    };
};
