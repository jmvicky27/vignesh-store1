import React, { Component, lazy, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { store } from './store/store';
import { selectCartOpen } from './features/ui/uiSlice';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/layout/Navbar';
import Toast from './components/common/Toast';
import './styles/global.css';

const CartDrawer = lazy(() => import('./components/cart/CartDrawer'));
const Footer = lazy(() => import('./components/layout/Footer'));

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('App ErrorBoundary caught:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
          <h2>Something went wrong loading this view.</h2>
          <pre style={{ color: 'red', marginTop: '10px' }}>{this.state.error?.toString()}</pre>
          <button
            onClick={() => { localStorage.clear(); window.location.href = '/'; }}
            style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer', background: '#1C3A5E', color: '#fff', border: 'none', borderRadius: '4px' }}
          >
            Reset Session & Return Home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppContent() {
  const cartOpen = useSelector(selectCartOpen);
  return (
    <>
      <Navbar />
      <main>
        <AppRoutes />
      </main>
      <Suspense fallback={null}>
        <Footer />
        {cartOpen && <CartDrawer />}
      </Suspense>
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );
}
