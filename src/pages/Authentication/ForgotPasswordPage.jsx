import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react';
import styles from './Auth.module.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>SECURITY RECOVERY</span>
          <h1 className={styles.title}>Passcode Reset</h1>
          <p className={styles.subtitle}>
            Enter the registered email associated with your atelier profile to receive an encryption recovery token.
          </p>
        </div>

        {submitted ? (
          <div className={styles.successBlock}>
            <CheckCircle2 size={36} className={styles.successIcon} />
            <h3>Reset Instructions Dispatched</h3>
            <p>
              We have forwarded a secure recovery link to <strong>{email}</strong>. Please review your inbox.
            </p>
            <Link to="/login" className={styles.switchLink}>
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Registered Email</label>
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

            <button type="submit" className={styles.submitBtn}>
              <span>Send Recovery Link</span>
              <ArrowRight size={16} />
            </button>

            <div className={styles.footerLinks}>
              <Link to="/login" className={styles.switchLink}>
                <ArrowLeft size={14} />
                <span>Return to Identification</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
