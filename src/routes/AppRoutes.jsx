import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectIsAdmin } from '../features/auth/authSlice';

// Lazy imports for code splitting
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('../pages/Home/HomePage'));
const ShopPage = lazy(() => import('../pages/Shop/ShopPage'));
const ProductDetailsPage = lazy(() => import('../pages/ProductDetails/ProductDetailsPage'));
const CartPage = lazy(() => import('../pages/Cart/CartPage'));
const WishlistPage = lazy(() => import('../pages/Wishlist/WishlistPage'));
const CheckoutPage = lazy(() => import('../pages/Checkout/CheckoutPage'));
const OrderConfirmationPage = lazy(() => import('../pages/OrderConfirmation/OrderConfirmationPage'));
const OrdersPage = lazy(() => import('../pages/Orders/OrdersPage'));
const OrderTrackingPage = lazy(() => import('../pages/OrderTracking/OrderTrackingPage'));
const LoginPage = lazy(() => import('../pages/Authentication/LoginPage'));
const RegisterPage = lazy(() => import('../pages/Authentication/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('../pages/Authentication/ForgotPasswordPage'));
const AccountPage = lazy(() => import('../pages/Account/AccountPage'));
const CategoriesPage = lazy(() => import('../pages/Categories/CategoriesPage'));
const SearchResultsPage = lazy(() => import('../pages/Search/SearchResultsPage'));
const AdminDashboard = lazy(() => import('../pages/Admin/AdminDashboard'));
const AdminProducts = lazy(() => import('../pages/Admin/AdminProducts'));
const AdminOrders = lazy(() => import('../pages/Admin/AdminOrders'));

function ProtectedRoute({ children, adminOnly = false }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAdmin = useSelector(selectIsAdmin);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />;
  return children;
}

function PageLoader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '60vh', fontFamily: 'DM Serif Display, serif', color: '#6B6B6B', fontSize: '1rem' }}>
      Loading...
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/order-tracking" element={<OrderTrackingPage />} />

        {/* Protected routes */}
        <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
        <Route path="/order-confirmation" element={<ProtectedRoute><OrderConfirmationPage /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
        <Route path="/account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />

        {/* Admin routes */}
        <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/products" element={<ProtectedRoute adminOnly><AdminProducts /></ProtectedRoute>} />
        <Route path="/admin/orders" element={<ProtectedRoute adminOnly><AdminOrders /></ProtectedRoute>} />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
