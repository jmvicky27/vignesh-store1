import { createSlice } from '@reduxjs/toolkit';

const MOCK_USERS = [
  { id: 1, email: 'admin@vigneshstore.example', password: 'admin123', name: 'Admin User', role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=1', phone: '+91 98765 XXXXX', address: 'Chennai, Tamil Nadu' },
  { id: 2, email: 'user@example.com', password: 'user123', name: 'Priya Sharma', role: 'customer',
    avatar: 'https://i.pravatar.cc/150?img=5', phone: '+91 98765 XXXXX', address: 'Mumbai, Maharashtra' },
];

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, isAuthenticated: false, error: null },
  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload;
      const user = MOCK_USERS.find(u => u.email === email && u.password === password);
      if (user) {
        const { password: _, ...safeUser } = user;
        state.user = safeUser;
        state.isAuthenticated = true;
        state.error = null;
      } else {
        state.error = 'Invalid email or password';
      }
    },
    register: (state, action) => {
      const { name, email } = action.payload;
      state.user = { id: Date.now(), name, email, role: 'customer', avatar: 'https://i.pravatar.cc/150?img=10' };
      state.isAuthenticated = true;
      state.error = null;
    },
    logout: (state) => { state.user = null; state.isAuthenticated = false; state.error = null; },
    clearError: (state) => { state.error = null; },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { login, register, logout, clearError, updateProfile } = authSlice.actions;
export const selectUser = s => s.auth.user;
export const selectIsAuthenticated = s => s.auth.isAuthenticated;
export const selectIsAdmin = s => s.auth.user?.role === 'admin';
export const selectAuthError = s => s.auth.error;
export default authSlice.reducer;
