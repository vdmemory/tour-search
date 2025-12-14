import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeoEntity, PricesMap } from "./types";

export interface SearchState {
    selectedDestination: GeoEntity | null;
    searchToken: string | null;
    isSearching: boolean;
    searchResults: PricesMap | null;
    searchError: string | null;
    retryCount: number;
    waitUntil: string | null;
}

const initialState: SearchState = {
    selectedDestination: null,
    searchToken: null,
    isSearching: false,
    searchResults: null,
    searchError: null,
    retryCount: 0,
    waitUntil: null,
};

const tourSearchSlice = createSlice({
    name: "tourSearch",
    initialState,
    reducers: {
        setSelectedDestination: (state, action: PayloadAction<GeoEntity | null>) => {
            state.selectedDestination = action.payload;
            state.searchResults = null;
            state.searchError = null;
        },
        startSearch: (state) => {
            state.isSearching = true;
            state.searchError = null;
            state.retryCount = 0;
            state.searchResults = null;
            state.waitUntil = null;
        },
        setSearchToken: (state, action: PayloadAction<{ token: string; waitUntil: string }>) => {
            state.searchToken = action.payload.token;
            state.waitUntil = action.payload.waitUntil;
            state.isSearching = true;
        },
        setWaitUntil: (state, action: PayloadAction<string>) => {
            state.waitUntil = action.payload;
        },
        setSearchResults: (state, action: PayloadAction<PricesMap>) => {
            state.searchResults = action.payload;
            state.isSearching = false;
            state.searchToken = null;
            state.waitUntil = null;
            state.searchError = null;
        },
        setSearchError: (state, action: PayloadAction<string>) => {
            state.searchError = action.payload;
            state.isSearching = false;
            state.searchToken = null;
            state.waitUntil = null;
        },
        incrementRetry: (state) => {
            state.retryCount += 1;
        },
        resetSearch: (state) => {
            state.searchToken = null;
            state.isSearching = false;
            state.searchError = null;
            state.retryCount = 0;
            state.waitUntil = null;
            state.searchResults = null;
        },
        clearResults: (state) => {
            state.searchResults = null;
        },
    },
});

export const {
    setSelectedDestination,
    startSearch,
    setSearchToken,
    setWaitUntil,
    setSearchResults,
    setSearchError,
    incrementRetry,
    resetSearch,
    clearResults,
} = tourSearchSlice.actions;

export default tourSearchSlice.reducer;
