"use client";

import styles from "./Loader.module.scss";

interface LoaderProps {
    className?: string;
}

export function Loader({ className }: LoaderProps) {
    const commonClass = `${styles.container} ${className ? className : ""}`;

    return (
        <div className={commonClass}>
            <div className={styles.loader}></div>
        </div>
    );
}
