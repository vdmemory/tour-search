"use client";

import React from "react";
import styles from "./Dropdown.module.scss";

interface DropdownProps<T> {
    items: T[];
    onSelect: (item: T) => void;
    renderItem: (item: T) => React.ReactNode;
    getKey: (item: T) => React.Key;
}

export const Dropdown = <T,>({ items, onSelect, renderItem, getKey }: DropdownProps<T>) => {
    return (
        <div className={styles.dropdownMenu}>
            {items.map((item) => (
                <div
                    key={getKey(item)}
                    className={styles.dropdownItem}
                    onClick={() => onSelect(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            onSelect(item);
                        }
                    }}
                >
                    {renderItem(item)}
                </div>
            ))}
        </div>
    );
};
