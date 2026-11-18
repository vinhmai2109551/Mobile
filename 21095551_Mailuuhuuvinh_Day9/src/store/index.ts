import { configureStore } from "@reduxjs/toolkit";
import { setTokenProvider } from "../api/client";
import cart from "./cartSlice";
import auth from "./authSlice";
import wishlist from "./wishlistSlice";

export const store = configureStore({ reducer: { cart, auth, wishlist } });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Axios tự gắn token của người đang đăng nhập vào mỗi request
setTokenProvider(() => store.getState().auth.token);
