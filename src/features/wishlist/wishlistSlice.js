import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { items: [] },
  reducers: {
    toggleWishlist: (state, action) => {
      const id = action.payload.id;
      const idx = state.items.findIndex(i => i.id === id);
      if (idx >= 0) state.items.splice(idx, 1);
      else state.items.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    clearWishlist: (state) => { state.items = []; },
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export const selectWishlistItems = s => s.wishlist.items;
export const selectWishlistIds = s => s.wishlist.items.map(i => i.id);
export const selectIsWishlisted = id => s => s.wishlist.items.some(i => i.id === id);
export default wishlistSlice.reducer;
