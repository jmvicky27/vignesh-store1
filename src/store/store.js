import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import wishlistReducer from '../features/wishlist/wishlistSlice';
import productsReducer from '../features/products/productsSlice';
import authReducer from '../features/auth/authSlice';
import ordersReducer from '../features/orders/ordersSlice';
import uiReducer from '../features/ui/uiSlice';

// Helper to safely load persisted state
const loadInitialState = () => {
  try {
    const serialized = localStorage.getItem('vignesh_store_cache');
    if (!serialized) return undefined;
    const parsed = JSON.parse(serialized);
    return {
      cart: parsed.cart,
      wishlist: parsed.wishlist,
      auth: parsed.auth,
    };
  } catch (err) {
    return undefined;
  }
};

const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
  products: productsReducer,
  auth: authReducer,
  orders: ordersReducer,
  ui: uiReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadInitialState(),
});

// Subscribe to store updates to persist cart, wishlist and auth
store.subscribe(() => {
  try {
    const state = store.getState();
    const toSave = {
      cart: state.cart,
      wishlist: state.wishlist,
      auth: state.auth,
    };
    localStorage.setItem('vignesh_store_cache', JSON.stringify(toSave));
  } catch (err) {
    // Ignore storage quota or disabled storage
  }
});

export const persistor = {
  purge: () => localStorage.removeItem('vignesh_store_cache'),
};
