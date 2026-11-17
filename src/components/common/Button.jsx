import React from 'react';
import styles from './Button.module.css';

const Spinner = () => (
  <svg
    className={styles.spinner}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className={styles.spinnerTrack}
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="3"
    />
    <path
      className={styles.spinnerArc}
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
);

const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  loading = false,
  icon: Icon,
  fullWidth = false,
  disabled,
  className = '',
  ...rest
}) => {
  const classes = [
    styles.btn,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    loading ? styles.loading : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading}
      {...rest}
    >
      {loading && <Spinner />}
      {!loading && Icon && (
        <span className={styles.iconWrap} aria-hidden="true">
          <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
        </span>
      )}
      <span className={styles.label}>{children}</span>
    </button>
  );
};

export default Button;
