import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { cartOpen: false, mobileMenuOpen: false, searchOpen: false, toast: null },
  reducers: {
    openCart: (state) => { state.cartOpen = true; },
    closeCart: (state) => { state.cartOpen = false; },
    toggleCart: (state) => { state.cartOpen = !state.cartOpen; },
    toggleMobileMenu: (state) => { state.mobileMenuOpen = !state.mobileMenuOpen; },
    closeMobileMenu: (state) => { state.mobileMenuOpen = false; },
    toggleSearch: (state) => { state.searchOpen = !state.searchOpen; },
    closeSearch: (state) => { state.searchOpen = false; },
    showToast: (state, action) => { state.toast = action.payload; },
    hideToast: (state) => { state.toast = null; },
  },
});

export const { openCart, closeCart, toggleCart, toggleMobileMenu, closeMobileMenu,
  toggleSearch, closeSearch, showToast, hideToast } = uiSlice.actions;
export const selectCartOpen = s => s.ui.cartOpen;
export const selectMobileMenuOpen = s => s.ui.mobileMenuOpen;
export const selectSearchOpen = s => s.ui.searchOpen;
export const selectToast = s => s.ui.toast;
export default uiSlice.reducer;
