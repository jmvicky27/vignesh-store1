import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import { register } from '../../features/auth/authSlice';
import { showToast } from '../../features/ui/uiSlice';
import styles from './Auth.module.css';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    dispatch(register({ name, email }));
    dispatch(
      showToast({
        type: 'success',
        message: 'Account registered successfully! Welcome to the Atelier.',
      })
    );
    navigate('/account');
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>JOIN THE ATELIER</span>
          <h1 className={styles.title}>Register Account</h1>
          <p className={styles.subtitle}>
            Experience priority access to capsule releases, private sales, and personal styling support.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Full Legal Name</label>
            <div className={styles.inputWrap}>
              <User size={16} className={styles.inputIcon} />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priya Sharma"
              />
            </div>
          </div>

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
            <label>Choose Passcode</label>
            <div className={styles.inputWrap}>
              <Lock size={16} className={styles.inputIcon} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
              />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            <span>Create Atelier Profile</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div className={styles.footerLinks}>
          <span>Already registered?</span>
          <Link to="/login" className={styles.switchLink}>
            Sign In Instead
          </Link>
        </div>
      </div>
    </div>
  );
}
