import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Sparkles, Compass, Eye, TrendingUp, Layers } from 'lucide-react';
import { products } from '../../data/products';
import { selectRecentlyViewed } from '../../features/products/productsSlice';
import ProductCard from '../common/ProductCard';
import styles from './RecommendationSection.module.css';

export default function RecommendationSection({ currentProductId, currentCategory }) {
  const [activeTab, setActiveTab] = useState('for-you');
  const recentlyViewed = useSelector(selectRecentlyViewed);

  // Recommendation engine algorithms (Frontend mock layer for later Django API integration)
  const getForYou = () => {
    return products
      .filter((p) => p.id !== currentProductId)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  };

  const getSimilar = () => {
    return products
      .filter((p) => p.category === currentCategory && p.id !== currentProductId)
      .slice(0, 4);
  };

  const getFrequentlyBoughtTogether = () => {
    // Cross-category synergy (e.g. footwear + accessories + clothing)
    return products
      .filter((p) => p.category !== currentCategory && p.id !== currentProductId)
      .slice(0, 4);
  };

  const getTrending = () => {
    return products.filter((p) => p.isTrending && p.id !== currentProductId).slice(0, 4);
  };

  const getDisplayItems = () => {
    switch (activeTab) {
      case 'for-you':
        return getForYou();
      case 'similar':
        return getSimilar().length > 0 ? getSimilar() : getForYou();
      case 'bought-together':
        return getFrequentlyBoughtTogether();
      case 'trending':
        return getTrending();
      case 'recent':
        return recentlyViewed.filter((p) => p.id !== currentProductId).slice(0, 4);
      default:
        return getForYou();
    }
  };

  const items = getDisplayItems();

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.titleWrap}>
          <span className={styles.eyebrow}>CURATED SELECTION</span>
          <h2 className={styles.heading}>Smart Recommendations</h2>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'for-you' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('for-you')}
          >
            <Sparkles size={14} />
            <span>Recommended For You</span>
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'similar' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('similar')}
          >
            <Compass size={14} />
            <span>Similar Items</span>
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'bought-together' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('bought-together')}
          >
            <Layers size={14} />
            <span>Frequently Bought Together</span>
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'trending' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('trending')}
          >
            <TrendingUp size={14} />
            <span>Trending</span>
          </button>
          {recentlyViewed.length > 0 && (
            <button
              className={`${styles.tabBtn} ${activeTab === 'recent' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('recent')}
            >
              <Eye size={14} />
              <span>Recently Viewed</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {items.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </section>
  );
}
