import { useState } from "react";
import { ENTITY_TYPE, selectSelectedType } from "@/entities/tours";
import { useAppSelector } from "@/shared/lib";

export const useFormDropdown = () => {
    const type = useAppSelector(selectSelectedType);

    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    const shouldLoadCountries = type === ENTITY_TYPE.COUNTRY || !type;

    return {
        isOpen,
        open,
        close,
        shouldLoadCountries,
    };
};
