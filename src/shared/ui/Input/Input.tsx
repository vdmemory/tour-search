"use client";

import React, { forwardRef, InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ error, className, ...props }, ref) => {
        const inputClass = `${styles.input} ${error ? styles.inputError : ""} ${className || ""}`;

        return <input ref={ref} className={inputClass} {...props} />;
    },
);

Input.displayName = "Input";
