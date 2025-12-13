import { useDispatch, useSelector, useStore } from "react-redux";
import type { createAppStore } from "@/app/store";

export type AppStore = ReturnType<typeof createAppStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = (selector: (state: RootState) => unknown) => useSelector(selector);
export const useAppStore = () => useStore<AppStore>();
