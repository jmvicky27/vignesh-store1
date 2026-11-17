import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], coupon: null },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1, selectedSize, selectedColor } = action.payload;
      const key = `${product.id}-${selectedSize}-${selectedColor}`;
      const existing = state.items.find(i => i.key === key);
      if (existing) {
        existing.quantity = Math.min(existing.quantity + quantity, product.stockCount || 10);
      } else {
        state.items.push({ ...product, quantity, selectedSize, selectedColor, key });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.key !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { key, quantity } = action.payload;
      const item = state.items.find(i => i.key === key);
      if (item) {
        if (quantity <= 0) state.items = state.items.filter(i => i.key !== key);
        else item.quantity = quantity;
      }
    },
    clearCart: (state) => { state.items = []; state.coupon = null; },
    applyCoupon: (state, action) => { state.coupon = action.payload; },
    removeCoupon: (state) => { state.coupon = null; },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, applyCoupon, removeCoupon } = cartSlice.actions;

export const selectCartItems = s => s.cart.items;
export const selectCartCount = s => s.cart.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectCartSubtotal = s => s.cart.items.reduce((sum, i) => sum + i.discountedPrice * i.quantity, 0);
export const selectCartSavings = s => s.cart.items.reduce((sum, i) => sum + (i.originalPrice - i.discountedPrice) * i.quantity, 0);

export default cartSlice.reducer;
