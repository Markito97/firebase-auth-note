import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import postsSlice from "./slices/postsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    posts: postsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
