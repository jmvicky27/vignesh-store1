import React from 'react';
import styles from './StarRating.module.css';

const StarRating = ({ rating = 0, count = 0, size = 'sm', showCount = true }) => {
  const clampedRating = Math.min(5, Math.max(0, rating));

  return (
    <div className={`${styles.wrapper} ${styles[size]}`} aria-label={`${clampedRating} out of 5 stars`}>
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => {
          const fill = Math.min(1, Math.max(0, clampedRating - (star - 1)));
          const pct = Math.round(fill * 100);
          return (
            <span key={star} className={styles.starWrapper}>
              {/* Grey base star */}
              <svg
                className={styles.starBase}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <polygon
                  points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7"
                  fill="#D1D5DB"
                />
              </svg>
              {/* Yellow fill star with clip */}
              {pct > 0 && (
                <svg
                  className={styles.starFill}
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
                >
                  <polygon
                    points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7"
                    fill="#F59E0B"
                  />
                </svg>
              )}
            </span>
          );
        })}
      </div>
      {showCount && (
        <span className={styles.meta}>
          <span className={styles.ratingNum}>{clampedRating.toFixed(1)}</span>
          {count > 0 && <span className={styles.count}>({count.toLocaleString()})</span>}
        </span>
      )}
    </div>
  );
};

export default StarRating;
