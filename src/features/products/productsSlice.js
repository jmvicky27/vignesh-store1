import { createSlice } from '@reduxjs/toolkit';
import { products as allProducts } from '../../data/products';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: allProducts,
    filtered: allProducts,
    searchQuery: '',
    filters: { category: '', minPrice: 0, maxPrice: 100000, minRating: 0, sort: 'featured' },
    recentlyViewed: [],
    loading: false,
  },
  reducers: {
    setSearchQuery: (state, action) => { state.searchQuery = action.payload; },
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = { category: '', minPrice: 0, maxPrice: 100000, minRating: 0, sort: 'featured' };
      state.searchQuery = '';
    },
    applyFilters: (state) => {
      let results = [...state.items];
      const { category, minPrice, maxPrice, minRating, sort } = state.filters;
      const q = state.searchQuery.toLowerCase();
      if (q) results = results.filter(p =>
        p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
      if (category) results = results.filter(p => p.category === category);
      results = results.filter(p => p.discountedPrice >= minPrice && p.discountedPrice <= maxPrice);
      if (minRating > 0) results = results.filter(p => p.rating >= minRating);
      switch (sort) {
        case 'price-asc':  results.sort((a,b) => a.discountedPrice - b.discountedPrice); break;
        case 'price-desc': results.sort((a,b) => b.discountedPrice - a.discountedPrice); break;
        case 'rating':     results.sort((a,b) => b.rating - a.rating); break;
        case 'newest':     results.sort((a,b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
        default: break;
      }
      state.filtered = results;
    },
    addRecentlyViewed: (state, action) => {
      const exists = state.recentlyViewed.find(p => p.id === action.payload.id);
      if (!exists) {
        state.recentlyViewed = [action.payload, ...state.recentlyViewed].slice(0, 10);
      }
    },
  },
});

export const { setSearchQuery, setFilter, resetFilters, applyFilters, addRecentlyViewed } = productsSlice.actions;
export const selectAllProducts = s => s.products.items;
export const selectFilteredProducts = s => s.products.filtered;
export const selectFilters = s => s.products.filters;
export const selectSearchQuery = s => s.products.searchQuery;
export const selectRecentlyViewed = s => s.products.recentlyViewed;
export default productsSlice.reducer;
