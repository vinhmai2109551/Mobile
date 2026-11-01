import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "../types";

interface CartState { items: CartItem[]; }
const initialState: CartState = { items: [] };

// Số lượng luôn nằm trong khoảng 1..stock
const clamp = (q: number, stock: number) => Math.max(1, Math.min(q, stock));

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Đã có sách trong giỏ thì tăng số lượng (không vượt stock), chưa có thì thêm mới
    addItem(state, action: PayloadAction<Omit<CartItem, "quantity">>) {
      if (action.payload.stock <= 0) return; // hết hàng thì không thêm
      const found = state.items.find((i) => i.bookId === action.payload.bookId);
      if (found) found.quantity = clamp(found.quantity + 1, found.stock);
      else state.items.push({ ...action.payload, quantity: 1 });
    },
    // Bỏ hẳn một sách khỏi giỏ
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.bookId !== action.payload);
    },
    // Đặt số lượng cụ thể, vẫn bị chặn bởi stock
    setQuantity(state, action: PayloadAction<{ bookId: number; quantity: number }>) {
      const found = state.items.find((i) => i.bookId === action.payload.bookId);
      if (found) found.quantity = clamp(action.payload.quantity, found.stock);
    },
    clearCart(state) { state.items = []; },
  },
});

export const { addItem, removeItem, setQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
