import React from 'react';
import styles from './SectionHeading.module.css';

const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  titleIsSerif = true,
}) => {
  return (
    <div className={`${styles.wrapper} ${styles[align]}`}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      {title && (
        <h2 className={`${styles.title} ${titleIsSerif ? styles.serif : styles.sans}`}>
          {title}
        </h2>
      )}
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
};

export default SectionHeading;
