import { RootState } from "@/shared/lib/redux/hooks";

export const searchStateSelector = (state: RootState) => state.tourSearch;
export const selectSelectedDestination = (state: RootState) => state.tourSearch.selectedDestination;
export const selectSelectedType = (state: RootState) => state.tourSearch.selectedDestination?.type;
