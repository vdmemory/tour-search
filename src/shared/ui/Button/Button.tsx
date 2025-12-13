"use client";

import React, { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = "primary",
    fullWidth,
    className,
    ...props
}) => {
    const buttonClass = `${styles.button} ${variant === "secondary" ? styles.secondary : ""} ${fullWidth ? styles.fullWidth : ""} ${className || ""}`;

    return (
        <button className={buttonClass} {...props}>
            {children}
        </button>
    );
};
