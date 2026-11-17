import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { categories } from '../../data/products';
import styles from './CategoriesPage.module.css';

export default function CategoriesPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>ARCHITECTURE OF STYLE</span>
        <h1 className={styles.title}>All Collections & Worlds</h1>
        <p className={styles.subtitle}>
          Explore pieces categorized by specialized material mastery, intended environment, and aesthetic discipline.
        </p>
      </div>

      <div className={styles.grid}>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/shop?category=${cat.id}`}
            className={styles.tile}
          >
            <div className={styles.imageWrap}>
              <img src={cat.image} alt={cat.name} className={styles.image} />
              <div className={styles.overlay} />
            </div>

            <div className={styles.content}>
              <div className={styles.topRow}>
                <span className={styles.badge}>{cat.count} Artifacts</span>
                <div className={styles.arrowIcon}>
                  <ArrowUpRight size={18} />
                </div>
              </div>

              <div className={styles.bottomRow}>
                <h2 className={styles.catName}>{cat.name}</h2>
                <p className={styles.desc}>{cat.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
