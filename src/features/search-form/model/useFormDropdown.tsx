import { useState } from "react";
import { ENTITY_TYPE, GeoEntity } from "@/entities/directory/model/types";

export const useFormDropdown = (selectedType?: GeoEntity["type"]) => {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    const shouldLoadCountries = selectedType === ENTITY_TYPE.COUNTRY || !selectedType;

    return {
        isOpen,
        open,
        close,
        shouldLoadCountries,
    };
};
