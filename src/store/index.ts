import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import authReducer from "./slices/auth.slice";
import { apiQuery } from "@/services/query";

export const createStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      [apiQuery.reducerPath]: apiQuery.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiQuery.middleware),
  });
};

// Infer the type of createStore
export type AppStore = ReturnType<typeof createStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// Pre-typed Redux hooks for use throughout your app
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
