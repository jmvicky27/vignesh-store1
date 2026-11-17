import React, { useId } from 'react';
import styles from './Input.module.css';

const Input = ({
  label,
  error,
  hint,
  icon: Icon,
  className = '',
  id: propId,
  ...rest
}) => {
  const generatedId = useId();
  const id = propId || generatedId;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  const describedBy = [
    error ? errorId : null,
    hint ? hintId : null,
  ]
    .filter(Boolean)
    .join(' ') || undefined;

  return (
    <div className={`${styles.fieldWrapper} ${className}`}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <div className={`${styles.inputWrapper} ${error ? styles.hasError : ''}`}>
        {Icon && (
          <span className={styles.iconLeft} aria-hidden="true">
            <Icon size={16} />
          </span>
        )}
        <input
          id={id}
          className={`${styles.input} ${Icon ? styles.withIcon : ''}`}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          {...rest}
        />
      </div>
      {error && (
        <span id={errorId} className={styles.errorMsg} role="alert">
          {error}
        </span>
      )}
      {!error && hint && (
        <span id={hintId} className={styles.hint}>
          {hint}
        </span>
      )}
    </div>
  );
};

export default Input;
