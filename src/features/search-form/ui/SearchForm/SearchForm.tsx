"use client";

import { DirectoryInput } from "../DirectoryInput/DirectoryInput";
import { GeoEntity, selectSelectedDestination, setSelectedDestination } from "@/entities/tours";
import { Button } from "@/shared/ui/Button/Button";
import { useRef } from "react";
import { useAppDispatch, useAppSelector, useClickOutside } from "@/shared/lib";
import { useGeoSearchData, useFormDropdown, useFormInput } from "../../model";
import styles from "./SearchForm.module.scss";
import { useSearchTours } from "../../model/useSearchTours";

export const SearchForm = () => {
    const input = useFormInput();
    const dispatch = useAppDispatch();
    const selection = useAppSelector(selectSelectedDestination);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const dropdown = useFormDropdown();
    useClickOutside(dropdownRef, dropdown.close);

    const { isLoading: isLoadingGeoSearch, items } = useGeoSearchData({
        inputValue: input.value,
    });
    const { startSearchTours, isSearchingTours } = useSearchTours();

    const handleSelect = (item: GeoEntity) => {
        dispatch(setSelectedDestination(item));
        input.setValue(item.name);
        dropdown.close();
    };

    const handleChange = (newValue: string) => {
        input.setValue(newValue);
        dropdown.open();

        if (selection?.type === "country") {
            dispatch(setSelectedDestination(null));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dropdown.close();
        if (!selection) return;
        startSearchTours(String(selection.id));
    };

    return (
        <form className={styles.searchForm} onSubmit={handleSubmit}>
            <DirectoryInput
                ref={dropdownRef}
                isOpen={dropdown.isOpen}
                isLoading={isLoadingGeoSearch}
                items={items}
                value={input.value}
                onChange={handleChange}
                onFocus={dropdown.open}
                onSelect={handleSelect}
            />
            <Button fullWidth type="submit" disabled={!selection || isSearchingTours}>
                Знайти
            </Button>
        </form>
    );
};
