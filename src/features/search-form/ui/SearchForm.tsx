"use client";

import { DirectoryInput, GeoEntity } from "@/entities/directory";
import { Button } from "@/shared/ui/Button/Button";
import { useRef } from "react";
import { useClickOutside } from "@/shared/lib";
import styles from "./SearchForm.module.scss";
import { useGeoSearchData, useDropdownSelection, useFormDropdown, useFormInput } from "../model";

export const SearchForm = () => {
    const input = useFormInput();
    const selection = useDropdownSelection();

    const dropdownRef = useRef<HTMLDivElement>(null);
    const dropdown = useFormDropdown(selection.selectedType);
    useClickOutside(dropdownRef, dropdown.close);

    const { isLoading, items } = useGeoSearchData({
        inputValue: input.value,
        selectedType: selection.selectedType,
    });

    const handleSelect = (item: GeoEntity) => {
        selection.select(item);
        input.setValue(item.name);
        dropdown.close();
    };

    const handleChange = (newValue: string) => {
        input.setValue(newValue);
        dropdown.open();

        if (selection.selectedType === "country") {
            selection.reset();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dropdown.close();
        console.log("Form submitted", {
            selectedGeo: selection.selected,
            inputValue: input.value,
        });
    };

    return (
        <form className={styles.searchForm} onSubmit={handleSubmit}>
            <DirectoryInput
                ref={dropdownRef}
                isOpen={dropdown.isOpen}
                isLoading={isLoading}
                items={items}
                value={input.value}
                onChange={handleChange}
                onFocus={dropdown.open}
                onSelect={handleSelect}
            />
            <Button fullWidth type="submit">
                Знайти
            </Button>
        </form>
    );
};
