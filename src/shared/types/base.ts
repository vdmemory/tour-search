// Пошук цін (оффер)
export type PriceOffer = {
    id: string; // UUID
    amount: number; // 1500–4000
    currency: "usd"; // нижній регістр за поточною реалізацією
    startDate: string; // YYYY-MM-DD (сьогодні +2..5)
    endDate: string; // YYYY-MM-DD (start +4..7)
    hotelID?: string; // додається в результатах пошуку цін
};

// Відповідь пошуку цін (готові результати)
export type PricesMap = Record<string, PriceOffer>;

// Уніфікована помилка
export type ErrorResponse = {
    code: number; // 400, 404, 425
    error: true;
    message: string;
    waitUntil?: string; // ISO для 425
};

// Успішні спеціальні відповіді
export type StartSearchResponse = {
    token: string;
    waitUntil: string; // ISO коли можна питати результати
};

export type GetSearchPricesResponse = {
    prices: PricesMap;
};

export type StopSearchResponse = {
    status: "cancelled";
    message: string;
};
