import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, Lock, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { login, selectAuthError, selectIsAuthenticated } from '../../features/auth/authSlice';
import { showToast } from '../../features/ui/uiSlice';
import styles from './Auth.module.css';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authError = useSelector(selectAuthError);

  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('user123');

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));

    // Also obtain JWT tokens from Django backend if reachable
    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';
      const res = await fetch(`${apiBase}/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        const access = data.tokens?.access || data.access;
        const refresh = data.tokens?.refresh || data.refresh;
        if (access) localStorage.setItem('access_token', access);
        if (refresh) localStorage.setItem('refresh_token', refresh);
      }
    } catch {
      // Fallback in client-only/offline mode
    }

    setTimeout(() => {
      if ((email === 'admin@vigneshstore.example' && password === 'admin123') || (email === 'admin@vigneshstore.com' && password === 'Admin@123')) {
        dispatch(showToast({ type: 'success', message: 'Signed in as Administrator' }));
        navigate('/admin');
      } else {
        dispatch(showToast({ type: 'success', message: 'Welcome back to VIGNESH STORE' }));
        navigate('/account');
      }
    }, 150);
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>MEMBERS ATELIER</span>
          <h1 className={styles.title}>Client Identification</h1>
          <p className={styles.subtitle}>
            Sign in to access your curated wishlist, order archive, and bespoke recommendations.
          </p>
        </div>

        {authError && (
          <div className={styles.errorAlert}>
            <AlertCircle size={16} />
            <span>{authError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Email Address</label>
            <div className={styles.inputWrap}>
              <Mail size={16} className={styles.inputIcon} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <div className={styles.labelRow}>
              <label>Passcode</label>
              <Link to="/forgot-password" className={styles.forgotLink}>
                Recover key?
              </Link>
            </div>
            <div className={styles.inputWrap}>
              <Lock size={16} className={styles.inputIcon} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            <span>Sign In to Account</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div className={styles.demoCredentials}>
          <p><strong>Demo Accounts:</strong></p>
          <p>Customer: <code>user@example.com</code> / <code>user123</code></p>
          <p>Admin: <code>admin@vigneshstore.example</code> / <code>admin123</code></p>
        </div>

        <div className={styles.footerLinks}>
          <span>New to VIGNESH STORE?</span>
          <Link to="/register" className={styles.switchLink}>
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
