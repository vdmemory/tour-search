import { ErrorResponse } from "@/entities/tours";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const toError = async (error: unknown): Promise<FetchBaseQueryError> => {
    if (error instanceof Response) {
        let errorData: unknown;
        try {
            errorData = (await error.json()) as ErrorResponse;
        } catch (e) {
            errorData = { message: "Помилка парсингу відповіді API" };
        }

        return {
            status: error.status,
            data: errorData,
        };
    }

    if (typeof error === "object" && error !== null && "status" in error) {
        return error as FetchBaseQueryError;
    }

    return {
        status: "FETCH_ERROR",
        error: `Невідома помилка: ${(error as Error)?.message ?? "Unknown error"}`,
    };
};

export const run = async <T>(
    factory: () => Promise<Response>,
): Promise<{ data: T } | { error: FetchBaseQueryError }> => {
    try {
        const response = await factory();

        if (!response.ok) {
            throw response;
        }

        const payload = (await response.json()) as T;
        return { data: payload };
    } catch (error) {
        return { error: await toError(error) };
    }
};
