import React from 'react';
import styles from './Badge.module.css';

const Badge = ({ children, variant = 'terracotta', size = 'sm' }) => {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${styles[size]}`}>
      {children}
    </span>
  );
};

export default Badge;
