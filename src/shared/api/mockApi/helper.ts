import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const toError = async (error: unknown): Promise<FetchBaseQueryError> => {
    if (error instanceof Response) {
        return {
            status: error.status,
            data: await error.json(),
        };
    }

    if (typeof error === "object" && error !== null && "status" in error) {
        return error as FetchBaseQueryError;
    }

    return {
        status: 500,
        data: {
            message: (error as Error)?.message ?? "Unknown error",
        },
    };
};

export const run = async <T>(factory: () => Promise<Response>) => {
    try {
        const response = await factory();
        const payload = (await response.json()) as T;

        return { data: payload } as const;
    } catch (error) {
        return { error: await toError(error) } as const;
    }
};
