import { useEffect, useState } from "react";
import { hydrateCart } from "../store/cartSlice";
import { setCredentials } from "../store/authSlice";
import { hydrateWishlist } from "../store/wishlistSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { CART_KEY, clearAuth, loadAuth, saveAuth, WISHLIST_KEY } from "../storage/authStorage";
import { loadJSON } from "../storage/storage";
import type { CartItem } from "../types";
import { useAutoPersist } from "./useAutoPersist";

// Trả về false cho tới khi đọc xong AsyncStorage (App hiện màn "Đang khởi động…")
export function usePersistence() {
  const dispatch = useAppDispatch();
  const [ready, setReady] = useState(false);
  const user = useAppSelector((s) => s.auth.user);
  const token = useAppSelector((s) => s.auth.token);
  const cartItems = useAppSelector((s) => s.cart.items);
  const wishlistIds = useAppSelector((s) => s.wishlist.ids);

  // Mở app: đọc cả 3 khoá song song rồi nạp vào store (auto-login, giỏ, yêu thích)
  useEffect(() => {
    (async () => {
      const [auth, cart, wish] = await Promise.all([
        loadAuth(),
        loadJSON<CartItem[]>(CART_KEY),
        loadJSON<number[]>(WISHLIST_KEY),
      ]);
      if (auth?.token && auth.user) dispatch(setCredentials(auth));
      if (cart) dispatch(hydrateCart(cart));
      if (wish) dispatch(hydrateWishlist(wish));
      setReady(true); // đọc xong mới cho phép ghi
    })();
  }, [dispatch]);

  // Đăng nhập thì lưu phiên, đăng xuất (user/token về null) thì xoá phiên
  useEffect(() => {
    if (!ready) return;
    if (user && token) saveAuth({ user, token });
    else clearAuth();
  }, [ready, user, token]);

  // Giỏ hàng và yêu thích dùng chung một hook ghi
  useAutoPersist(CART_KEY, cartItems, ready);
  useAutoPersist(WISHLIST_KEY, wishlistIds, ready);

  return ready;
}
