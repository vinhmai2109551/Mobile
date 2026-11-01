import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./index";
import type { CartItem, User } from "../types";
import { addItem, clearCart, removeItem, setQuantity } from "./cartSlice";
import { logout, setCredentials } from "./authSlice";
import { toggleWishlist } from "./wishlistSlice";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

// ADAPTER: giao diện chỉ gọi useCart/useAuth/useWishlist, không biết Redux.
// Sau này đổi sang Zustand chỉ cần sửa file này.
export function useCart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);

  // Tổng số lượng và tổng tiền, chỉ tính lại khi items đổi
  const totalQuantity = useMemo(() => items.reduce((n, i) => n + i.quantity, 0), [items]);
  const totalPrice = useMemo(() => items.reduce((n, i) => n + i.price * i.quantity, 0), [items]);

  return {
    items,
    totalQuantity,
    totalPrice,
    add: useCallback((item: Omit<CartItem, "quantity">) => dispatch(addItem(item)), [dispatch]),
    remove: useCallback((bookId: number) => dispatch(removeItem(bookId)), [dispatch]),
    setQty: useCallback((bookId: number, quantity: number) => dispatch(setQuantity({ bookId, quantity })), [dispatch]),
    clear: useCallback(() => dispatch(clearCart()), [dispatch]),
  };
}

export function useAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const token = useAppSelector((s) => s.auth.token);

  return {
    user,
    token,
    isLoggedIn: !!token && !!user, // đăng nhập khi có CẢ token và user
    signIn: useCallback((u: User, t: string) => dispatch(setCredentials({ user: u, token: t })), [dispatch]),
    signOut: useCallback(() => dispatch(logout()), [dispatch]),
  };
}

export function useWishlist() {
  const dispatch = useAppDispatch();
  const ids = useAppSelector((s) => s.wishlist.ids);

  return {
    ids,
    isFavorite: useCallback((bookId: number) => ids.includes(bookId), [ids]),
    toggle: useCallback((bookId: number) => dispatch(toggleWishlist(bookId)), [dispatch]),
  };
}
