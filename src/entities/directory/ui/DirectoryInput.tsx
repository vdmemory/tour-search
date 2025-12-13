"use client";

import React from "react";
import { Dropdown } from "@/shared/ui/Dropdown/Dropdown";
import { Input } from "@/shared/ui/Input/Input";
import { GeoEntity } from "../model/types";
import { DirectoryContent } from "./DirectoryItemContent/DirectoryItemContent";
import { getDirectoryIcon } from "../lib/getDirectoryIcon";
import { getDirectoryDetails } from "../lib/getDirectoryDetails";
import styles from "./DirectoryInput.module.scss";
import { Loader } from "@/shared/ui/Loader/Loader";

interface DirectoryInputProps {
    items: GeoEntity[];
    isOpen: boolean;
    isLoading: boolean;
    value: string;
    onChange: (value: string) => void;
    onFocus: () => void;
    onSelect: (item: GeoEntity) => void;
}

export const DirectoryInput = React.forwardRef<HTMLDivElement, DirectoryInputProps>(
    ({ items, value, onChange, isOpen, onFocus, onSelect, isLoading }, ref) => {
        const isOpened = isOpen && items.length > 0;

        return (
            <div className={styles.input} ref={ref} style={{ position: "relative" }}>
                <label className={styles.label} htmlFor="destination">
                    Напрямок подорожі
                </label>
                <div className={styles.inputWrapper}>
                    <Input
                        value={value}
                        onFocus={onFocus}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="Оберіть країну, місто або готель..."
                    />
                    {isLoading && <Loader className={styles.loader} />}
                    {isOpened && (
                        <Dropdown<GeoEntity>
                            items={items}
                            getKey={(item) => item.id}
                            onSelect={onSelect}
                            renderItem={(item) => (
                                <DirectoryContent
                                    icon={getDirectoryIcon(item)}
                                    name={item.name}
                                    details={getDirectoryDetails(item)}
                                />
                            )}
                        />
                    )}
                </div>
            </div>
        );
    },
);

DirectoryInput.displayName = "DirectoryInput";
