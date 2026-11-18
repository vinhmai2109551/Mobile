import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface WishlistState { ids: number[]; } // chỉ lưu id sách yêu thích
const initialState: WishlistState = { ids: [] };

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // Có rồi thì bỏ ra, chưa có thì thêm vào
    toggleWishlist(state, action: PayloadAction<number>) {
      const i = state.ids.indexOf(action.payload);
      if (i >= 0) state.ids.splice(i, 1); else state.ids.push(action.payload);
    },
    // Nạp danh sách đã lưu khi mở app (chỉ giữ các id là số)
    hydrateWishlist(state, action: PayloadAction<number[]>) {
      state.ids = action.payload.filter((id) => typeof id === "number");
    },
  },
});

export const { toggleWishlist, hydrateWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
